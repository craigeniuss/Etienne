(function () {
  "use strict";

  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobileNav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      mobileNav.hidden = expanded;
      mobileNav.classList.toggle("is-open", !expanded);
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
        mobileNav.classList.remove("is-open");
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // FAQ accordion
  var accordion = document.querySelector("[data-accordion]");
  if (accordion) {
    accordion.querySelectorAll(".faq-item").forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        accordion.querySelectorAll(".faq-item").forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  // Schedule Site Tour form → thecolletteteam@gmail.com (FormSubmit)
  var FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/thecolletteteam@gmail.com";
  var tourForm = document.getElementById("tourForm");
  if (tourForm) {
    var currentStep = 1;
    var stepEls = tourForm.querySelectorAll("[data-tour-step]");
    var stepIndicators = tourForm.querySelectorAll("[data-step-indicator]");
    var progressBar = tourForm.querySelector("[data-progress-bar]");
    var tourBody = tourForm.querySelector("[data-tour-body]");
    var successPanel = tourForm.querySelector("[data-tour-success]");
    var successCopy = tourForm.querySelector("[data-success-copy]");
    var successSummary = tourForm.querySelector("[data-success-summary]");
    var dateInput = tourForm.querySelector("#tourDate");
    var nextBtn = tourForm.querySelector("[data-tour-next]");
    var backBtn = tourForm.querySelector("[data-tour-back]");
    var resetBtn = tourForm.querySelector("[data-tour-reset]");
    var agentError = tourForm.querySelector("[data-agent-error]");

    if (dateInput) {
      var today = new Date();
      dateInput.min = today.toISOString().split("T")[0];
    }

    function formatDate(value) {
      if (!value) return "";
      var parts = value.split("-");
      if (parts.length !== 3) return value;
      var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    }

    function formatTime(value) {
      if (!value) return "";
      var select = tourForm.querySelector("#tourTime");
      if (!select) return value;
      var option = select.querySelector('option[value="' + value + '"]');
      return option ? option.textContent : value;
    }

    function setStep(step) {
      currentStep = step;
      stepEls.forEach(function (el) {
        var active = Number(el.getAttribute("data-tour-step")) === step;
        el.hidden = !active;
        el.classList.toggle("is-active", active);
      });
      stepIndicators.forEach(function (indicator) {
        var indicatorStep = Number(indicator.getAttribute("data-step-indicator"));
        indicator.classList.toggle("is-active", indicatorStep === step);
        indicator.classList.toggle("is-complete", indicatorStep < step);
      });
      if (progressBar) {
        progressBar.style.width = step === 1 ? "50%" : "100%";
      }
    }

    function clearInvalid(fields) {
      fields.forEach(function (field) {
        field.removeAttribute("aria-invalid");
      });
    }

    function validateStep1() {
      var fields = [
        tourForm.querySelector("#firstName"),
        tourForm.querySelector("#lastName"),
        tourForm.querySelector("#tourPhone"),
        tourForm.querySelector("#tourEmail")
      ];
      var valid = true;
      clearInvalid(fields);

      fields.forEach(function (field) {
        if (!field.value.trim() || (field.type === "email" && !field.checkValidity())) {
          field.setAttribute("aria-invalid", "true");
          valid = false;
        }
      });

      if (!valid) {
        var firstInvalid = tourForm.querySelector("[aria-invalid='true']");
        if (firstInvalid) firstInvalid.focus();
      }
      return valid;
    }

    function validateStep2() {
      var fields = [
        tourForm.querySelector("#tourDate"),
        tourForm.querySelector("#tourTime")
      ];
      var valid = true;
      clearInvalid(fields);

      fields.forEach(function (field) {
        if (!field.value) {
          field.setAttribute("aria-invalid", "true");
          valid = false;
        }
      });

      var agentSelected = tourForm.querySelector('input[name="agent"]:checked');
      if (!agentSelected) {
        if (agentError) agentError.hidden = false;
        valid = false;
      } else if (agentError) {
        agentError.hidden = true;
      }

      if (!valid) {
        var firstInvalid = tourForm.querySelector("[aria-invalid='true']");
        if (firstInvalid) {
          firstInvalid.focus();
        } else {
          var firstAgent = tourForm.querySelector('input[name="agent"]');
          if (firstAgent) firstAgent.focus();
        }
      }
      return valid;
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (!validateStep1()) return;
        setStep(2);
        var dateField = tourForm.querySelector("#tourDate");
        if (dateField) dateField.focus();
      });
    }

    if (backBtn) {
      backBtn.addEventListener("click", function () {
        setStep(1);
        if (agentError) agentError.hidden = true;
        tourForm.querySelector("#firstName").focus();
      });
    }

    tourForm.querySelectorAll('input[name="agent"]').forEach(function (radio) {
      radio.addEventListener("change", function () {
        if (agentError) agentError.hidden = true;
      });
    });

    var submitBtn = tourForm.querySelector('button[type="submit"]');
    var formError = tourForm.querySelector("[data-form-error]");

    function showSuccess(firstName, phone, email, date, time, agent, interests) {
      if (successCopy) {
        successCopy.textContent =
          "Thanks, " + firstName + " — Craig will confirm your tour within one business day.";
      }

      if (successSummary) {
        successSummary.innerHTML =
          "<dt>Preferred visit</dt><dd>" + formatDate(date) + " · " + formatTime(time) + "</dd>" +
          "<dt>Contact</dt><dd>" + phone + " · " + email + "</dd>" +
          "<dt>Working with agent</dt><dd>" + (agent === "yes" ? "Yes" : "No") + "</dd>" +
          (interests.length
            ? "<dt>Lot interest</dt><dd>" + interests.join(", ") + "</dd>"
            : "");
      }

      if (tourBody) tourBody.hidden = true;
      if (successPanel) {
        successPanel.hidden = false;
        successPanel.focus();
      }
    }

    tourForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateStep2()) return;

      if (formError) {
        formError.hidden = true;
        formError.textContent = "";
      }

      var firstName = tourForm.querySelector("#firstName").value.trim();
      var lastName = tourForm.querySelector("#lastName").value.trim();
      var phone = tourForm.querySelector("#tourPhone").value.trim();
      var email = tourForm.querySelector("#tourEmail").value.trim();
      var date = tourForm.querySelector("#tourDate").value;
      var time = tourForm.querySelector("#tourTime").value;
      var agent = tourForm.querySelector('input[name="agent"]:checked').value;
      var message = tourForm.querySelector("#tourMessage").value.trim();
      var interests = Array.prototype.slice
        .call(tourForm.querySelectorAll('input[name="interest"]:checked'))
        .map(function (input) { return input.parentElement.textContent.trim(); });

      var payload = {
        _subject: "New Site Tour Request — Étienne at Deer Creek Meadows",
        _template: "table",
        _captcha: "false",
        _replyto: email,
        form_type: "Schedule Site Tour",
        name: firstName + " " + lastName,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        preferred_date: formatDate(date),
        preferred_time: formatTime(time),
        working_with_agent: agent === "yes" ? "Yes" : "No",
        lot_interest: interests.length ? interests.join(", ") : "—",
        message: message || "—"
      };

      var originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      fetch(FORM_SUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Form submit failed");
          return res.json();
        })
        .then(function () {
          showSuccess(firstName, phone, email, date, time, agent, interests);
          tourForm.reset();
          if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];
          setStep(1);
        })
        .catch(function () {
          if (formError) {
            formError.textContent =
              "We couldn't send your request. Please call 801-864-1655 or try again in a moment.";
            formError.hidden = false;
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
        });
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        tourForm.reset();
        if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];
        if (agentError) agentError.hidden = true;
        if (tourBody) tourBody.hidden = false;
        if (successPanel) successPanel.hidden = true;
        setStep(1);
        tourForm.querySelector("#firstName").focus();
      });
    }

    // Deep-link support: #schedule-tour?lot=elderberry
    var params = new URLSearchParams(window.location.search);
    if (params.get("lot") === "elderberry") {
      var elderberry = tourForm.querySelector('input[value="elderberry"]');
      if (elderberry) elderberry.checked = true;
    }
  }

  // Map lightbox
  var mapModal = document.getElementById("mapModal");
  var mapTrigger = document.querySelector("[data-map-trigger]");

  function openMapModal() {
    if (!mapModal) return;
    mapModal.hidden = false;
    document.body.style.overflow = "hidden";
    mapModal.querySelector(".map-modal-close").focus();
  }

  function closeMapModal() {
    if (!mapModal) return;
    mapModal.hidden = true;
    document.body.style.overflow = "";
    if (mapTrigger) mapTrigger.focus();
  }

  if (mapTrigger && mapModal) {
    mapTrigger.addEventListener("click", openMapModal);
    mapTrigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openMapModal();
      }
    });
    mapModal.querySelectorAll("[data-map-close]").forEach(function (el) {
      el.addEventListener("click", closeMapModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mapModal && !mapModal.hidden) closeMapModal();
    });
  }

  // Sticky header shadow
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        header.classList.toggle("is-scrolled", window.scrollY > 20);
      },
      { passive: true }
    );
  }
})();
