# Build stage
FROM openjdk:17-jdk-slim as build

WORKDIR /app

# Copy Maven files and download dependencies
COPY ./pom.xml ./
COPY ./mvnw ./mvnw
COPY ./.mvn ./.mvn
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# Copy source code and build jar
COPY ./src ./src
RUN ./mvnw clean package -DskipTests

# Run stage (lighter image)
FROM openjdk:17-slim

WORKDIR /app

# Copy jar file from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
