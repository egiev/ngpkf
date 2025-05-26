#!/bin/bash

# Set your bootstrap server
KAFKA_TOPICS_CLI="/opt/kafka/bin/kafka-topics.sh"
BOOTSTRAP_SERVER="broker:9092"

# List of topics to create
TOPICS=("user.create" "user.created" "user.otp_generate" "user.otp_generated" "user.otp_verify" "user.otp_verified")

for TOPIC in "${TOPICS[@]}"
do
  echo "Creating topic: $TOPIC"
    "$KAFKA_TOPICS_CLI" \
      --bootstrap-server "$BOOTSTRAP_SERVER" \
      --create \
      --if-not-exists \
      --topic "$TOPIC"
done

