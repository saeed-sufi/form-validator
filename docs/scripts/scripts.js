const form = document.querySelector("#form")
const name = document.querySelector("#name")
const email = document.querySelector("#email")
const task = document.querySelector("#task")
const phone = document.querySelector("#phone")
const budgetBtns = document.querySelectorAll(".budget input[type='radio']")
const acquaintance = document.querySelector("#acquaintance")
const closeFormBtn = document.querySelector(".form__close-btn")
const openFormBtn = document.querySelector(".form__open-btn")
const formLightbox = document.querySelector(".form-lightbox")
let isValidEmail = false
let isValidTask = false
let isValidRequiredFields = false

/*
 Event listeners
*/
form.addEventListener("submit", (e) => {
  isValidEmail = false
  isValidTask = false
  isValidRequiredFields = false
  validateForm()

  if (!isValidEmail || !isValidTask || !isValidRequiredFields) {
    console.log("email:", isValidEmail)
    console.log("input fields:", isValidRequiredFields)
    console.log("task:", isValidTask)
    e.preventDefault()
  }
})

closeFormBtn.addEventListener("click", () => {
  closeForm()
})

openFormBtn.addEventListener("click", () => {
  formLightbox.classList.add("form-lightbox--visible")
  setTimeout(() => {
    name.focus()
  }, 301);
})

document.addEventListener("keyup", (e) => {
  if (e.key == "Escape") {
    closeForm()
  }
})

/*
 Utility functions
*/

function validateForm() {
  checkRequired([name, phone, email])
  checkEmail(email)
  checkTextLength(task, 400)
}

function showError(element, message) {
  const formControl = element.parentElement
  formControl.className = "form-control error"
  formControl.querySelector("small").innerText = message
}

function showSuccess(element) {
  const formControl = element.parentElement
  formControl.className = "form-control success"
}

function checkRequired(inputsArr) {
  let flag = true
  inputsArr.forEach((input) => {
    if (input.value.trim() == "") {
      showError(input, `${getInputField(input)} field required.`)
      flag = false
    } else {
      showSuccess(input)
    }
  })

  if (flag) {
    isValidRequiredFields = true
  }
}

function getInputField(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

function checkEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  isValidEmail = re.test(String(email.value).toLowerCase())

  if (!isValidEmail && email.value.trim() != "") {
    showError(email, "Email is not valid.")
  } else if (isValidEmail && email.value.trim() != "") {
    showSuccess(email)
    isValidEmail = true
  }
}

function checkTextLength(input, maxValue) {
  let flag = true
  if (input.value.length > maxValue) {
    showError(input, "Input length is too high")
    flag = false
  } else if (input.value.trim() != "") {
    showSuccess(input)
  }

  if (flag) {
    isValidTask = true
  }
}

function resetForm() {
  clearFields(name, phone, email, task)

  const formControls = form.querySelectorAll(".form-control")
  const smallFields = form.querySelectorAll("small")

  // romving any border color related to success and error states styling from input elements
  formControls.forEach((formControl) => {
    formControl.className = "form-control"
  })

  // removing any warning text resulted from error state
  smallFields.forEach((smallField) => {
    smallField.innerText = ""
  })

  // if any radio btn selected, uncheck it.
  budgetBtns.forEach((budgetBtn) => {
    if (budgetBtn.checked) {
      budgetBtn.checked = false
    }
  })

  // if any option is selected, deselect it
  acquaintance.options[acquaintance.selectedIndex].selected = false
}

function closeForm() {
  formLightbox.classList.remove("form-lightbox--visible")

  // lightbox fields are a bit shifted while closing lightbox if form is resetted immediatelly so:
  setTimeout(() => {
    resetForm()
  }, 200)
}

function clearFields(name, phone, email, task) {
  name.value = ''
  phone.value = ''
  email.value = ''
  task.value = ''
}
