<template>
  <div class="nestly-privacy">
    <div class="container">
      <h1>Nestly Privacy Policy</h1>
      <p class="updated">Last updated: July 27, 2026</p>

      <p>Nestly is built privacy-first. This policy explains what data the app
        handles and how.</p>

      <h2>1. The short version</h2>
      <p>Nestly does <strong>not</strong> have user accounts, does <strong>not</strong>
        have a backend server, and does <strong>not</strong> send your personal data
        anywhere. Everything you enter stays on your device. We don't sell data, we
        don't show ads, and we don't track you.</p>

      <h2>2. Data we collect</h2>
      <p><strong>None directly.</strong> Nestly collects no personal information
        about you.</p>
      <p>The only data that exists is the data <strong>you</strong> type into the
        app — your pregnancy details, journal entries, trackers, favorites — and it
        is stored only on your device in a local, encrypted database.</p>

      <h2>3. Data stored on your device</h2>
      <ul>
        <li>Pregnancy due-date and progress information.</li>
        <li>Journal entries (stored encrypted; the key is held in your device's
          secure keystore/keychain).</li>
        <li>Meditation history and favorites.</li>
        <li>Tracker data: kick counts, contractions, weight, blood pressure, baby
          names, checklists.</li>
        <li>App preferences (theme, language, notification settings).</li>
      </ul>
      <p>You can export or delete all of this at any time from within the app.
        Uninstalling the app removes it entirely.</p>

      <h2>4. Data that leaves your device</h2>
      <p>Almost none. The exceptions:</p>
      <ul>
        <li><strong>In-app purchases</strong> are processed by Google Play (and
          Apple, on iOS) via the official store systems. Purchase and restore
          requests go to the store; we use no third-party payment middleware.</li>
        <li><strong>Feedback emails</strong>, if you choose to send one, are
          composed in <strong>your own</strong> email app and sent by you to our
          feedback inbox. Nothing is sent until you press send in your mail
          client.</li>
        <li><strong>Optional health data import</strong> reads weight and blood
          pressure from Apple Health / Health Connect <strong>on your device</strong>.
          This data never leaves your device; it is only read into the local app
          database when you explicitly grant permission.</li>
        <li><strong>Optional content-pack downloads</strong> (e.g. extra meditation
          audio), if/when added, would download only the content you request.</li>
      </ul>

      <h2>5. Third-party services</h2>
      <ul>
        <li><strong>Google Play Billing</strong> / <strong>Apple StoreKit</strong>
          — for processing the one-time unlock purchase. Governed by Google's and
          Apple's respective privacy policies.</li>
        <li><strong>No advertising SDKs. No analytics. No crash reporting.</strong>
          (If this changes, this policy will be updated and those services will be
          opt-in.)</li>
      </ul>

      <h2>6. Permissions the app requests</h2>
      <ul>
        <li>Notifications (for the reminders you configure).</li>
        <li>Audio background playback (so meditation audio keeps playing when the
          screen is off).</li>
        <li>Health data read (optional, opt-in — weight + blood pressure only).</li>
        <li>On older Android devices, the Google Fit fallback may request activity
          recognition and location for health import.</li>
      </ul>

      <h2>7. Children's privacy</h2>
      <p>Nestly is intended for adults. The app is not directed at children under
        13 (or the applicable age in your country), and we do not knowingly collect
        any information from them.</p>

      <h2>8. Your rights</h2>
      <p>Because all data lives on your device and there is no backend, you have
        full control:</p>
      <ul>
        <li><strong>Access &amp; portability:</strong> export your data from the
          app at any time.</li>
        <li><strong>Erasure:</strong> clear all data from the app, or simply
          uninstall it.</li>
      </ul>

      <h2>9. Changes to this policy</h2>
      <p>If we change how the app handles data, we'll update this page and the
        in-app privacy screen.</p>

      <h2>10. Contact</h2>
      <p>Questions about privacy? Email: <a href="mailto:muratoguzhan411@gmail.com">muratoguzhan411@gmail.com</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NestlyPrivacyPolicy'
}
</script>

<style scoped>
.nestly-privacy {
  padding: 2rem 0;
  color: var(--text-color);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1, h2, h3, h4 {
  color: var(--heading-color, var(--text-color));
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

h2 {
  font-size: 1.75rem;
  margin-top: 2rem;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.25rem;
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

ul {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

a {
  color: var(--accent-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.updated {
  color: var(--text-color);
  opacity: 0.7;
  font-style: italic;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }

  h1 {
    font-size: 1.75rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4 {
    font-size: 1.1rem;
  }
}
</style>
