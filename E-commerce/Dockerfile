# Build stage
FROM openjdk:17-jdk-slim as build

WORKDIR /app

COPY ./pom.xml ./
COPY ./mvnw ./mvnw
COPY ./.mvn ./.mvn
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

COPY ./src ./src
RUN ./mvnw clean package -DskipTests

# Run stage
FROM openjdk:17-slim

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
