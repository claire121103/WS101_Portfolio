// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const themeToggle = document.querySelector(".theme-toggle")
    const sidebar = document.querySelector(".sidebar")
    const sidebarToggle = document.querySelector(".sidebar-toggle")
    const sections = document.querySelectorAll("section")
    const skillBars = document.querySelectorAll(".skill-level")
    const contactForm = document.getElementById("contactForm")
  
    // Activity page elements
    const activityToggles = document.querySelectorAll(".activity-toggle")
    const codeHeaders = document.querySelectorAll(".code-header")
  
    // Theme Toggle
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme")
  
      // Save theme preference to localStorage
      if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
    })
  
    // Check for saved theme preference
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-theme")
    }
  
    // Mobile Sidebar Toggle
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active")
      })
    }
  
    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (sidebar && sidebar.classList.contains("active") && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
        sidebar.classList.remove("active")
      }
    })
  
    // Form Validation
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        let isValid = true
  
        // Validate Name
        const nameInput = document.getElementById("name")
        if (nameInput.value.trim() === "") {
          showError(nameInput, "Name is required")
          isValid = false
        } else {
          clearError(nameInput)
        }
  
        // Validate Email
        const emailInput = document.getElementById("email")
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (emailInput.value.trim() === "") {
          showError(emailInput, "Email is required")
          isValid = false
        } else if (!emailRegex.test(emailInput.value)) {
          showError(emailInput, "Please enter a valid email")
          isValid = false
        } else {
          clearError(emailInput)
        }
  
        // Validate Subject
        const subjectInput = document.getElementById("subject")
        if (subjectInput.value.trim() === "") {
          showError(subjectInput, "Subject is required")
          isValid = false
        } else {
          clearError(subjectInput)
        }
  
        // Validate Message
        const messageInput = document.getElementById("message")
        if (messageInput.value.trim() === "") {
          showError(messageInput, "Message is required")
          isValid = false
        } else if (messageInput.value.trim().length < 10) {
          showError(messageInput, "Message must be at least 10 characters")
          isValid = false
        } else {
          clearError(messageInput)
        }
  
        // If form is valid, submit it (or show success message)
        if (isValid) {
          // In a real application, you would send the form data to a server
          // For this example, we'll just show a success message
          contactForm.innerHTML = `
            <div class="success-message">
              <i class="fas fa-check-circle"></i>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for contacting me. I'll get back to you soon.</p>
            </div>
          `
        }
      })
    }
  
    // Helper functions for form validation
    function showError(input, message) {
      const formGroup = input.parentElement
      formGroup.classList.add("error")
      const errorMessage = formGroup.querySelector(".error-message")
      errorMessage.textContent = message
    }
  
    function clearError(input) {
      const formGroup = input.parentElement
      formGroup.classList.remove("error")
      const errorMessage = formGroup.querySelector(".error-message")
      errorMessage.textContent = ""
    }
  
    // Scroll Animation
    function checkScroll() {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (sectionTop < windowHeight * 0.75) {
          section.classList.add("fade-in")
  
          // Animate skill bars if in about section
          if (section.id === "about") {
            skillBars.forEach((bar) => {
              const width = bar.style.width
              bar.style.width = "0"
              setTimeout(() => {
                bar.style.width = width
              }, 200)
            })
          }
        }
      })
    }
  
    // Initial check on page load
    checkScroll()
  
    // Check on scroll
    window.addEventListener("scroll", checkScroll)
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        if (targetId.startsWith("#")) {
          e.preventDefault()
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            const headerHeight = 80 // Approximate header height
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            })
          }
        }
      })
    })
  
    // Activity toggles
    if (activityToggles.length > 0) {
      activityToggles.forEach((toggle) => {
        toggle.addEventListener("click", function () {
          this.classList.toggle("active")
          const content = this.nextElementSibling
  
          if (content.classList.contains("active")) {
            content.classList.remove("active")
          } else {
            content.classList.add("active")
          }
        })
      })
    }
  
    // Code section toggles
    if (codeHeaders.length > 0) {
      codeHeaders.forEach((header) => {
        header.addEventListener("click", function () {
          const codeBody = this.nextElementSibling
  
          if (codeBody.classList.contains("active")) {
            codeBody.classList.remove("active")
          } else {
            codeBody.classList.add("active")
          }
        })
      })
    }
  })
  