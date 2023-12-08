<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title> Botty euer Chatbot</v-card-title>
            <v-card-text>
              <v-list v-if="messages.length">
                <v-list-item v-for="(message, index) in messages" :key="index" :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }">
                  <v-card-text>{{ message.text }}</v-card-text>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-text-field v-model="userMessage" label="Ihre Frage" outlined></v-text-field>
              <v-btn @click="sendMessage" color="primary">Senden</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      userMessage: "",
      messages: [],
      responses: {
        "Nein, ich habe keine weiteren Fragen" : "Wenn sich neue Fragen ergeben, stehe ich dir zur Verfügung. Vielen Dank und einen schönen Tag!",
        "Nein":"Gut zu wissen! Falls du in Zukunft Unterstützung benötigen, bin ich hier. Auf Wiedersehen!",
        "Hallo": "Herzlich willkommen! Wie kann ich dir behilflich sein?",
        "Guten Tag": "Guten Tag! Was führt dich zu uns? Wie kann ich dir helfen?",
        "Hi": "Hallo! Wie kann ich  heute weiterhelfen?",
        "Servus": "Servus! Wie darf ich dir assistieren?",
        "Moin": "Moin! Wie kann ich dich unterstützen?",
        "Salut": "Salut! Wie darf ich dir behilflich sein?",
        "Hey": "Hey! Wie kann ich dir heute helfen?",
        "Danke": "Hast du noch weitere Fragen oder gibt es etwas, bei dem ich dir besser helfen könnte? Dein Feedback ist uns wichtig.",
        "Dankeschön": "Ist alles zu deiner Zufriedenheit erledigt? Wir würden uns über dein Feedback freuen, um unseren Service zu verbessern.",
        "Vielen Dank": "Gibt es noch etwas, bei dem ich dir behilflich sein kann? Wir schätzen Ihr Feedback.",
        "Tschüss": "Vielen Dank, dass du unseren Service genutzt haben! Falls du weitere Fragen hast, stehe ich dir gerne zur Verfügung. Auf Wiedersehen!",
        "Auf Wiedersehen": "Wenn dir noch weitere Unterstützung benötigen, bin ich hier. Vielen Dank für dein Vertrauen. Auf Wiedersehen!",
        "Bis bald": "Bis bald! Bei weiteren Anliegen stehe ich dir gerne zur Verfügung.",
        "Adieu": "Adieu! Falls du künftig Fragen hast, lasse es mich wissen.",
        "Mach's gut": "Mach's gut! Falls du weitere Unterstützung brauchst, stehe ich zur Verfügung.",
        "Tschau": "Tschau! Bei Bedarf bin ich für dich da. Auf Wiedersehen!",
        "Wie bewerbe ich mich für einen Studienplatz?": "Der Bewerbungsprozess an der DHBW Mannheim ist besonders: Für einen Studienplatz bewerbe dich direkt bei unseren Dualen Partnern. Es gibt keinen festen Bewerbungszeitraum, wir empfehlen dir jedoch, ca. 1 Jahr vor Studienstart mit Ihren Bewerbungen zu beginnen.",
        "Welche Unterlagen sind für die Zulassung erforderlich?": "Erforderliche Unterlagen sind in der Regel der Nachweis der Hochschulzugangsberechtigung, ein vorliegender Ausbildungs- bzw. Praktikumsvertrag und gegebenenfalls das Bestehen von Auswahltests.",
        "Wie melde ich mich zu Prüfungen an?": "Die Prüfungsanmeldung erfolgt automatisch. Ein Prüfungsrücktritt ist nur mit Attest möglich.",
        "Wo finde ich Informationen zu Studiengebühren?": "An der DHBW Mannheim gibt es – außer für internationale Studierende und bei einem Zweitstudium – keine Studiengebühren. Es fallen lediglich die üblichen Studienbeiträge mit einer aktuellen Gesamtsumme von 364,60 Euro pro Jahr an. Weitere Infos sind [hier](https://www.mannheim.dhbw.de/dual-studieren/studienplaetze-immatrikulation/studienkosten) verfügbar.",
        "Welche Möglichkeiten gibt es für ein Auslandssemester?": "Im Rahmen Ihres Studiums an der DHBW Mannheim kannst du eine Theoriephase im Ausland absolvieren. Du hast die Wahl zwischen geförderten Austauschprogrammen ohne Studiengebühren (Erasmus+ oder bilaterale Programme) und gebührenpflichtigen Programmen mit Studiengebühren. Anmeldefristen und weitere Infos findest du im International Office.",
        "Wo finde ich Informationen zu Prüfungsmodalitäten?": "Informationen zu Prüfungsmodalitäten sind [hier](https://www.mannheim.dhbw.de/service/dokumente?tx_dhbwdownloadcenter_frontend%5B%40widget_0%5D%5BcurrentPage%5D=37&cHash=32e484a5f174853f9313d7a29712b405) verfügbar.",
        "Gibt es Sport- und Freizeitmöglichkeiten auf dem Campus?": "Der Hochschulsport bietet eine Vielzahl von Sportmöglichkeiten. Informationen zum Angebot, Anmelde- und Teilnahmebedingungen findest du auf der Website der [Universität Mannheim](https://www.uni-mannheim.de/sport/)",
        "Wie kann ich mich für studentische Vereine oder Aktivitäten anmelden?": "Für studentische Vereine oder Aktivitäten kannst du dich in der Regel direkt bei den jeweiligen Vereinen anmelden. Informationen dazu findest du auf den Websites der Vereine oder durch Kontaktaufnahme mit den studentischen Organisationen vor Ort.",
        "An wen kann ich mich bei technischen Problemen wenden?": "Bei technischen Problemen kannst du  dich an das [IT-Service-Center](https://www.mannheim.dhbw.de/service/itservice-center/ansprechpersonen) wenden.",
        "Wie finde ich die Kontaktdaten des Studiensekretariats?": "Die Kontaktdaten des Studiensekretariats findest du [hier](https://www.mannheim.dhbw.de/service/servicezentrum-studium-und-lehre/ansprechpersonen).",
        "Wo kann ich aktuelle Informationen zu Veranstaltungen und Neuigkeiten finden?": "Aktuelle Informationen zu Veranstaltungen und Neuigkeiten sind auf der [Veranstaltungsseite](https://events.mannheim.dhbw.de/event) der DHBW Mannheim verfügbar.",
        "Was muss ich tun, wenn ich krank bin und nicht an einer Vorlesung teilnehmen kann? Bin ich Attest-pflichtig?": "Ein ärztliches Attest ist in der Regel noch am Tag der Prüfung, spätestens jedoch innerhalb der darauffolgenden 3 Tage vorzulegen. Die gesundheitliche Beeinträchtigung muss spätestens am Prüfungstag festgestellt werden, zu einem späteren Zeitpunkt ausgestellte Atteste können nicht anerkannt werden.",
        "Wie lange hat das Sekretariat auf?": "Die Öffnungszeiten des Sekretariats können je nach Studiengang variieren. Weitere Informationen findest du [hier](https://www.mannheim.dhbw.de/dhbw-mannheim/ansprechpersonen/alle/a-z/w).",
        "Wo befindet sich das Formular (Prüfungsrücktritt, Antrag auf Verlängerung, Krankmeldung, …)": "Das Formular findest du [hier](https://www.mannheim.dhbw.de/service/dokumente?tx_dhbwdownloadcenter_frontend%5BitemsPerPage%5D=10&tx_dhbwdownloadcenter_frontend%5BsearchRequest%5D%5BbaseCategory%5D=120&tx_dhbwdownloadcenter_frontend%5BsearchRequest%5D%5BchildCategory%5D=136&tx_dhbwdownloadcenter_frontend%5BsearchRequest%5D%5BsearchWord%5D=&tx_dhbwdownloadcenter_frontend%5BsearchRequest%5D%5BthirdCategory%5D=149&tx_dhbwdownloadcenter_frontend%5B__referrer%5D%5B%40action%5D=list&tx_dhbwdownloadcenter_frontend%5B__referrer%5D%5B%40controller%5D=DownloadcenterFrontend&tx_dhbwdownloadcenter_frontend%5B__referrer%5D%5B%40extension%5D=DhbwDownloadcenter&tx_dhbwdownloadcenter_frontend%5B__referrer%5D%5B%40request%5D=%7B%22%40extension%22%3A%22DhbwDownloadcenter%22%2C%22%40controller%22%3A%22DownloadcenterFrontend%22%2C%22%40action%22%3A%22list%22%7D935d0ad7269e19d7f0cf2eddd941216862b89f6f&tx_dhbwdownloadcenter_frontend%5B__referrer%5D%5Barguments%5D=YTozOntzOjk6IkB3aWRnZXRfMCI7YToxOntzOjExOiJjdXJyZW50UGFnZSI7czoxOiIzIjt9czoxMjoiaXRlbXNQZXJQYWdlIjtzOjI6Ij",







      }
    };
  },
  methods: {
    sendMessage() {
      if (this.userMessage.trim() === "") return;

      const response = this.findMatchingResponse(this.userMessage);

      this.messages.push({ text: this.userMessage, isUser: true });
      if (response) {
        this.messages.push({ text: response, isUser: false });
      } else {
        this.messages.push({ text: "Entschuldigung, ich habe die Frage nicht verstanden.", isUser: false });
      }
      this.userMessage = "";
    },
    findMatchingResponse(userQuestion) {
      for (const question in this.responses) {
        if (userQuestion.toLowerCase().includes(question.toLowerCase())) {
          return this.responses[question];
        }
      }
      return null;
    }
  }
};


</script>

<style scoped>
.message {
  margin: 8px 0; /* Oberer und unterer Abstand zwischen den Nachrichten */
  padding: 8px;
  border-radius: 10px; /* Abgerundete Kanten */
  height: auto;
  ax-width: 60%
}

.user-message {
  border-radius: 12px; /* Abgerundete Kanten */
  background-color: #4f5f68;
  color: #fff; /* Weiße Schriftfarbe für Benutzer-Nachrichten */
  margin-right: 8px; /* Abstand zu rechten Nachbar-Elementen (Bot-Nachrichten) */
  margin: 8px 0; /* Oberer und unterer Abstand zwischen den Nachrichten */
  max-width: 50%;
  height: 60px; /* Höhe der Benutzerbox erhöhen */
}

.bot-message {
  border-radius: 12px; /* Abgerundete Kanten */
  background-color: #eb1b2a;
  color: #fff;
  margin-left: auto;
  margin: 8px 0;
  max-width: 50%;
  text-align: right;
  height: 60px;

}
</style>