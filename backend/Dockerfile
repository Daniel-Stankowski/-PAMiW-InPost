FROM openjdk:17-jdk-alpine as builder

WORKDIR app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN apk update && apk add dos2unix
RUN dos2unix mvnw
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

COPY src src
RUN ./mvnw package -DskipTests

ARG JAR_FILE=target/*.jar
RUN java -Djarmode=layertools -jar ${JAR_FILE} extract --destination target/extracted

FROM openjdk:17-jdk-alpine

WORKDIR app
ARG EXTRACTED=app/target/extracted
COPY --from=builder ${EXTRACTED}/dependencies/ ./
COPY --from=builder ${EXTRACTED}/spring-boot-loader/ ./
COPY --from=builder ${EXTRACTED}/snapshot-dependencies/ ./
COPY --from=builder ${EXTRACTED}/application/ ./

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]