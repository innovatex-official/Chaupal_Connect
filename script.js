/**
 * Chaupal Connect — single-page landing interactions
 *
 * This file is intentionally vanilla JS (no build step) so the contest site
 * runs from GitHub Pages / any static host. Each block below is independent:
 * if Voice fails in Safari, nav/FAQ/feed still work.
 *
 * Blocks: mobile nav · sticky header · smooth scroll · active nav · FAQ ·
 * ticker pause · scroll reveals · Voice-to-Text · join form · Village Feed
 */
(function () {
  "use strict";

  /* ---- Shared DOM ---- */
  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  var navBackdrop = document.getElementById("nav-backdrop");
  var navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  var faqButtons = document.querySelectorAll(".faq-question");
  var sections = document.querySelectorAll("section[id]");
  var tickerTrack = document.getElementById("ticker-track");
  var tickerWrap = document.querySelector(".ticker-wrap");
  /* Match CSS breakpoint where the hamburger hides and desktop nav shows */
  var mqDesktop = window.matchMedia("(min-width: 1025px)");

  /* ---- Mobile navigation ----
     Drawer lives outside <header> in the HTML so sticky layout never jumps.
     Escape + backdrop click close it; desktop breakpoint always resets closed. */
  function openNav() {
    if (!mobileNav || !navToggle || mqDesktop.matches) return;
    mobileNav.hidden = false;
    mobileNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation menu");
    document.body.classList.add("nav-open");
    if (navBackdrop) {
      navBackdrop.hidden = false;
      navBackdrop.classList.add("is-visible");
    }
  }

  function closeNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.remove("is-open");
    mobileNav.hidden = true;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("nav-open");
    if (navBackdrop) {
      navBackdrop.hidden = true;
      navBackdrop.classList.remove("is-visible");
    }
  }

  function toggleNav() {
    if (navToggle.getAttribute("aria-expanded") === "true") {
      closeNav();
    } else {
      openNav();
    }
  }

  if (navToggle && mobileNav) {
    closeNav();

    navToggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      toggleNav();
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeNav();
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    if (navBackdrop) {
      navBackdrop.addEventListener("click", closeNav);
    }

    function onBreakpointChange() {
      closeNav();
    }

    if (mqDesktop.addEventListener) {
      mqDesktop.addEventListener("change", onBreakpointChange);
    } else if (mqDesktop.addListener) {
      mqDesktop.addListener(onBreakpointChange);
    }
  }

  /* ---- Sticky header shadow after a little scroll ---- */
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      },
      { passive: true }
    );
  }

  /* ---- In-page anchors
     Smooth scroll + focus the target so keyboard / screen-reader users
     land in the right place (scroll-padding-top is set in CSS for the sticky chrome). */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      if (targetId === "#top") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      var target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
        }
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ---- Active nav highlight while scrolling ---- */
  function updateActiveNav() {
    var scrollPos = window.scrollY + 150;
    var currentId = "";

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      link.classList.toggle("active", href === "#" + currentId);
    });
  }

  if (navLinks.length && sections.length) {
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();
  }

  /* ---- FAQ accordion (one open at a time) ---- */
  faqButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var isExpanded = this.getAttribute("aria-expanded") === "true";
      var answer = document.getElementById(this.getAttribute("aria-controls"));

      faqButtons.forEach(function (otherBtn) {
        if (otherBtn !== button) {
          otherBtn.setAttribute("aria-expanded", "false");
          var otherAnswer = document.getElementById(otherBtn.getAttribute("aria-controls"));
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      this.setAttribute("aria-expanded", String(!isExpanded));
      if (answer) answer.hidden = isExpanded;
    });
  });

  /* ---- Village Buzz ticker: pause when hovered / focused (readability) ---- */
  if (tickerTrack && tickerWrap) {
    function pauseTicker() {
      tickerTrack.style.animationPlayState = "paused";
    }
    function resumeTicker() {
      tickerTrack.style.animationPlayState = "running";
    }
    tickerWrap.addEventListener("mouseenter", pauseTicker);
    tickerWrap.addEventListener("mouseleave", resumeTicker);
    tickerWrap.addEventListener("focusin", pauseTicker);
    tickerWrap.addEventListener("focusout", resumeTicker);
  }

  /* ---- Scroll reveals
     One-shot IntersectionObserver. Decorative only — never blocks clicks.
     Without IO support we just show everything (no stuck opacity:0). */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ------------------------------------------------------------------
     Voice-to-Text (Web Speech API)
     Contest asks for accessibility Voice-to-Text. This is a browser-only
     demo — pick a language, tap to start, tap again to stop.

     Why tap-to-toggle and not hold-to-speak: the first tap triggers the
     browser mic permission prompt, which takes the pointer away from the
     button. A hold gesture then receives pointerup/pointerleave and stops
     recognition the instant the user clicks "Allow". Toggling is also
     easier for elders and for phone users.

     No translation layer: the story is "speak to join the chaupal".
     Chrome/Edge recommended; Safari support varies.
     ------------------------------------------------------------------ */
  var voiceDemo = document.getElementById("voice-demo");
  var voiceLanguage = document.getElementById("voice-language");
  var voiceStart = document.getElementById("voice-start");
  var voiceCopy = document.getElementById("voice-copy");
  var voiceClear = document.getElementById("voice-clear");
  var voiceStatus = document.getElementById("voice-status");
  var voiceBtnLabel = document.getElementById("voice-btn-label");
  var voiceListeningBadge = document.getElementById("voice-listening-badge");
  var voicePlaceholder = document.getElementById("voice-transcript-placeholder");
  var voiceListeningText = document.getElementById("voice-listening-text");
  var voiceTranscriptText = document.getElementById("voice-transcript-text");
  var voiceFinalText = document.getElementById("voice-final-text");
  var voiceInterimText = document.getElementById("voice-interim-text");
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = null;
  var listening = false;
  var finalTranscript = "";
  /* Set while we wait for onstart, so a double tap cannot fire start twice */
  var voiceStarting = false;

  function setVoiceStatus(message) {
    if (voiceStatus) voiceStatus.textContent = message;
  }

  function getVoiceLanguageLabel() {
    if (!voiceLanguage) return "your language";
    return voiceLanguage.options[voiceLanguage.selectedIndex].text;
  }

  function setVoiceListening(isListening) {
    listening = isListening;
    if (voiceDemo) voiceDemo.classList.toggle("is-listening", isListening);
    if (voiceStart) voiceStart.setAttribute("aria-pressed", String(isListening));
    if (voiceBtnLabel) {
      voiceBtnLabel.textContent = isListening ? "Stop Listening" : "Start Speaking";
    }
    if (voiceListeningBadge) voiceListeningBadge.hidden = !isListening;
  }

  function renderVoiceTranscript(interimTranscript) {
    var hasFinal = !!finalTranscript;
    var hasInterim = !!interimTranscript;

    if (voicePlaceholder) voicePlaceholder.hidden = listening || hasFinal || hasInterim;
    if (voiceListeningText) voiceListeningText.hidden = !listening || hasFinal || hasInterim;
    if (voiceTranscriptText) voiceTranscriptText.hidden = !hasFinal && !hasInterim;
    if (voiceFinalText) voiceFinalText.textContent = finalTranscript;
    if (voiceInterimText) {
      voiceInterimText.textContent = hasInterim
        ? (hasFinal ? " " : "") + interimTranscript
        : "";
    }
    if (voiceCopy) voiceCopy.disabled = !hasFinal;
  }

  function startVoiceRecognition() {
    if (!recognition || listening || voiceStarting) return;
    voiceStarting = true;
    try {
      recognition.lang = voiceLanguage ? voiceLanguage.value : "en-IN";
      setVoiceListening(true);
      renderVoiceTranscript("");
      // First run shows the browser permission prompt; onstart lands after "Allow"
      setVoiceStatus("Allow microphone access, then speak in " + getVoiceLanguageLabel() + ".");
      recognition.start();
    } catch (error) {
      voiceStarting = false;
      setVoiceListening(false);
      renderVoiceTranscript("");
      setVoiceStatus("The microphone is busy. Wait a moment and try again.");
    }
  }

  function stopVoiceRecognition() {
    if (!recognition || (!listening && !voiceStarting)) return;
    // Promote any still-interim words into the final transcript before stop,
    // otherwise the last phrase is lost when onend clears the interim span.
    var interimNow = voiceInterimText ? voiceInterimText.textContent.trim() : "";
    if (interimNow) {
      finalTranscript = (finalTranscript + " " + interimNow).replace(/\s+/g, " ").trim();
      if (voiceInterimText) voiceInterimText.textContent = "";
    }
    try {
      recognition.stop();
    } catch (error) {
      voiceStarting = false;
      setVoiceListening(false);
    }
  }

  function toggleVoiceRecognition() {
    if (listening || voiceStarting) stopVoiceRecognition();
    else startVoiceRecognition();
  }

  if (voiceStart) {
    if (!SpeechRecognition) {
      voiceStart.disabled = true;
      setVoiceStatus("Voice input is unavailable here. Open this page in Chrome or Edge.");
    } else {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = function () {
        voiceStarting = false;
        setVoiceListening(true);
        renderVoiceTranscript("");
        setVoiceStatus("Listening in " + getVoiceLanguageLabel() + " — speak clearly.");
      };

      recognition.onresult = function (event) {
        var interimTranscript = "";

        for (var i = event.resultIndex; i < event.results.length; i += 1) {
          var words = event.results[i][0].transcript.trim();
          if (event.results[i].isFinal) {
            finalTranscript = (finalTranscript + " " + words).replace(/\s+/g, " ").trim();
          } else {
            interimTranscript += (interimTranscript ? " " : "") + words;
          }
        }

        renderVoiceTranscript(interimTranscript);
      };

      recognition.onerror = function (event) {
        voiceStarting = false;
        setVoiceListening(false);
        renderVoiceTranscript("");

        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setVoiceStatus("Microphone blocked. Allow mic for this site in the address bar, then tap again.");
        } else if (event.error === "no-speech") {
          setVoiceStatus("No speech detected. Tap Start Speaking and talk a little closer to the mic.");
        } else if (event.error === "audio-capture") {
          setVoiceStatus("No microphone found. Connect a mic and try again.");
        } else if (event.error !== "aborted") {
          setVoiceStatus("Speech could not be captured. Check the selected language and retry.");
        }
      };

      recognition.onend = function () {
        voiceStarting = false;
        setVoiceListening(false);
        renderVoiceTranscript("");
        setVoiceStatus(
          finalTranscript
            ? "Transcript ready. Copy it, or tap Start Speaking to add more."
            : "Ready. Tap Start Speaking and talk."
        );
      };

      // Plain click: works with the permission prompt, mouse, touch, and keyboard
      voiceStart.addEventListener("click", function (event) {
        event.preventDefault();
        toggleVoiceRecognition();
      });
    }
  }

  if (voiceLanguage) {
    voiceLanguage.addEventListener("change", function () {
      if (listening || voiceStarting) stopVoiceRecognition();
      setVoiceStatus("Ready to listen in " + getVoiceLanguageLabel() + ".");
    });
  }

  if (voiceCopy) {
    voiceCopy.addEventListener("click", function () {
      if (!finalTranscript) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(finalTranscript).then(function () {
          setVoiceStatus("Transcript copied.");
        }).catch(function () {
          setVoiceStatus("Copy failed. Try again.");
        });
      } else {
        setVoiceStatus("Copy is unavailable in this browser.");
      }
    });
  }

  if (voiceClear) {
    voiceClear.addEventListener("click", function () {
      if (listening || voiceStarting) stopVoiceRecognition();
      finalTranscript = "";
      renderVoiceTranscript("");
      setVoiceStatus("Cleared. Tap Start Speaking when you are ready.");
    });
  }

  renderVoiceTranscript("");

  /* ------------------------------------------------------------------
     Join / waitlist form
     Client-side validation only (name, village, 10-digit phone, language).
     Shows a welcome message — no server. Good enough for the landing demo.
     ------------------------------------------------------------------ */
  var joinForm = document.getElementById("join-form");
  var joinError = document.getElementById("join-error");
  var joinSuccess = document.getElementById("join-success");
  var joinSuccessMsg = document.getElementById("join-success-msg");

  if (joinForm) {
    joinForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = (document.getElementById("join-name").value || "").trim();
      var village = (document.getElementById("join-village").value || "").trim();
      var phone = (document.getElementById("join-phone").value || "").trim();
      var language = document.getElementById("join-lang").value;
      var digits = phone.replace(/\D/g, "");

      if (joinError) {
        joinError.hidden = true;
        joinError.textContent = "";
      }

      if (!name || !village || !phone || !language) {
        if (joinError) {
          joinError.hidden = false;
          joinError.textContent = "Please fill in every field to join your village chaupal.";
        }
        return;
      }

      if (digits.length < 10) {
        if (joinError) {
          joinError.hidden = false;
          joinError.textContent = "Enter a valid 10-digit mobile number.";
        }
        document.getElementById("join-phone").focus();
        return;
      }

      joinForm.hidden = true;
      if (joinSuccess) {
        joinSuccess.hidden = false;
        if (joinSuccessMsg) {
          joinSuccessMsg.textContent =
            "Namaste, " + name + "! You are registered for " + village + ". Your digital banyan tree is ready.";
        }
        joinSuccess.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     Village Feed (client-side only)
     Makes the landing feel like a product preview: sample posts, filters,
     Support/Save toggles, and a composer that prepends a card in-memory.
     Nothing is saved to a server — refresh clears user posts. That is
     intentional for a contest landing (not a full social backend).
     ------------------------------------------------------------------ */
  var feedList = document.getElementById("feed-list");
  var feedEmpty = document.getElementById("feed-empty");
  var feedFilters = document.querySelectorAll(".feed-filter");
  var feedPostBtn = document.getElementById("feed-post-btn");
  var feedError = document.getElementById("feed-error");
  var activeFeedFilter = "all";

  var feedTagLabels = {
    news: "News",
    issue: "Issue",
    celebration: "Celebration"
  };

  var feedAvatarByType = {
    news: "assets/svg/news.svg",
    issue: "assets/svg/users.svg",
    celebration: "assets/svg/sun.svg"
  };

  function updateFeedVisibility() {
    if (!feedList) return;
    var cards = feedList.querySelectorAll(".feed-card");
    var visible = 0;
    cards.forEach(function (card) {
      var type = card.getAttribute("data-type");
      var show = activeFeedFilter === "all" || type === activeFeedFilter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (feedEmpty) feedEmpty.hidden = visible > 0;
  }

  function bindFeedCardActions(card) {
    card.querySelectorAll(".feed-action").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var action = btn.getAttribute("data-action");
        var pressed = btn.getAttribute("aria-pressed") === "true";
        if (action === "support") {
          var countEl = btn.querySelector(".feed-count");
          var count = countEl ? parseInt(countEl.textContent, 10) || 0 : 0;
          if (pressed) {
            btn.setAttribute("aria-pressed", "false");
            if (countEl) countEl.textContent = String(Math.max(0, count - 1));
          } else {
            btn.setAttribute("aria-pressed", "true");
            if (countEl) countEl.textContent = String(count + 1);
          }
        } else if (action === "save") {
          btn.setAttribute("aria-pressed", String(!pressed));
          btn.textContent = pressed ? "Save" : "Saved";
        }
      });
    });
  }

  if (feedList) {
    feedList.querySelectorAll(".feed-card").forEach(bindFeedCardActions);
  }

  feedFilters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeFeedFilter = btn.getAttribute("data-filter") || "all";
      feedFilters.forEach(function (other) {
        var on = other === btn;
        other.classList.toggle("is-active", on);
        other.setAttribute("aria-pressed", String(on));
      });
      updateFeedVisibility();
    });
  });

  if (feedPostBtn && feedList) {
    feedPostBtn.addEventListener("click", function () {
      var authorInput = document.getElementById("feed-author");
      var typeInput = document.getElementById("feed-type");
      var messageInput = document.getElementById("feed-message");
      var author = (authorInput && authorInput.value ? authorInput.value : "").trim();
      var type = typeInput ? typeInput.value : "news";
      var message = (messageInput && messageInput.value ? messageInput.value : "").trim();

      if (feedError) {
        feedError.hidden = true;
        feedError.textContent = "";
      }

      if (!author || !message) {
        if (feedError) {
          feedError.hidden = false;
          feedError.textContent = "Add your name and a short message to post.";
        }
        return;
      }

      var card = document.createElement("article");
      card.className = "feed-card";
      card.setAttribute("role", "listitem");
      card.setAttribute("data-type", type);
      card.innerHTML =
        '<header class="feed-card-head">' +
          '<img src="' + feedAvatarByType[type] + '" alt="Villager avatar" title="Villager avatar" width="40" height="40" class="feed-avatar">' +
          "<div>" +
            '<p class="feed-author"></p>' +
            '<p class="feed-meta">Your village · Just now · <span class="feed-tag feed-tag-' + type + '"></span></p>' +
          "</div>" +
        "</header>" +
        '<p class="feed-body"></p>' +
        '<footer class="feed-actions">' +
          '<button type="button" class="feed-action" data-action="support" aria-pressed="false">Support <span class="feed-count">1</span></button>' +
          '<button type="button" class="feed-action" data-action="save" aria-pressed="false">Save</button>' +
        "</footer>";

      card.querySelector(".feed-author").textContent = author;
      card.querySelector(".feed-tag").textContent = feedTagLabels[type] || "News";
      card.querySelector(".feed-body").textContent = message;

      feedList.insertBefore(card, feedList.firstChild);
      bindFeedCardActions(card);
      updateFeedVisibility();

      if (messageInput) messageInput.value = "";
      if (authorInput) authorInput.focus();
    });
  }

  updateFeedVisibility();
})();
