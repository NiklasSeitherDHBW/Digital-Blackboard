<template>
  <div class="chatbot-container">
    <p>Hallo, ich bin Boardy, dein Freund und Helfer rund ums Studium...</p>

    <!-- Chatnachrichten anzeigen -->
    <div v-for="message in messages" :key="message.id" class="chat-message">
      {{ message.text }}
    </div>

    <!-- Eingabefeld für die Benutzernachricht -->
    <v-text-field v-model="userMessage" @keyup.enter="sendMessage" class="user-input" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      userMessage: "",
    };
  },
  methods: {
    async sendMessage() {
      // Fügen Sie Ihre OpenAI-API-Zugangsdaten hier ein
      const apiKey = "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";
      const endpoint = "https://api.openai.com/v1/engines/davinci-codex/completions";

      try {
        const response = await axios.post(
            endpoint,
            {
              prompt: this.userMessage,
              max_tokens: 100,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
              },
            }
        );

        // Verarbeiten Sie die Antwort und fügen Sie sie zu den Chatnachrichten hinzu
        const botMessage = response.data.choices[0].text.trim();
        this.messages.push({ text: `Benutzer: ${this.userMessage}`, id: Date.now() });
        this.messages.push({ text: `Bot: ${botMessage}`, id: Date.now() + 1 });
        this.userMessage = ""; // Leeren Sie das Eingabefeld
      } catch (error) {
        console.error("Fehler beim Senden der Nachricht an OpenAI", error);
      }
    },
  },
};
</script>

<style scoped>
/* Chatbot-Container */
.chatbot-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

/* Chatnachrichten-Stil */
.chat-message {
  margin-bottom: 10px;
  padding: 8px;
  background-color: #f2f2f2;
  border-radius: 4px;
}

/* Benutzereingabe-Stil */
.user-input {
  margin-top: 10px;
}
</style>
