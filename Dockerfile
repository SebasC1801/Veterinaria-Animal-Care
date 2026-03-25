# Etapa 1: Compilar con Maven
FROM maven:3.8.6-openjdk-11 AS build
WORKDIR /app
COPY java-app/pom.xml .
COPY java-app/src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Ejecutar la aplicación
FROM eclipse-temurin:11-jre
WORKDIR /app
COPY --from=build /app/target/veterinary-system-1.0.0.jar app.jar
EXPOSE 8086
CMD ["java", "-Dserver.port=${PORT:-8086}", "-jar", "app.jar"]
