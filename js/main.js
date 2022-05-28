const from = document.getElementById("from");

const inputs = document.querySelectorAll(".txt");
const iconErrors = document.querySelectorAll(".icon__error");
const alerts = document.querySelectorAll(".alert");

const filter = {
  first: /^[a-zA-Z]{3,20}$/,
  last: /^[a-zA-Z]{3,20}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  pass: /^[a-zA-Z0-9]{6,10}$/,
};

const fields = {
  first: false,
  last: false,
  email: false,
  pass: false,
};

function ClassActive(name) {
  document.getElementById(name).classList.add("txt__error-active");
  document
    .getElementById(`icon__${name}__error`)
    .classList.add("icon__error-active");
  document.getElementById(`alert__${name}`).classList.add("alert-active");
}

function ClassInactive(name) {
  document.getElementById(name).classList.remove("txt__error-active");
  document
    .getElementById(`icon__${name}__error`)
    .classList.remove("icon__error-active");
  document.getElementById(`alert__${name}`).classList.remove("alert-active");
}

function reset() {
  fields.first = false;
  fields.last = false;
  fields.email = false;
  fields.pass = false;

  inputs.forEach((input) => {
    input.value = "";
  });
}

function ValidateField(name, valor) {
  if (filter[name].test(valor)) {
    fields[`${name}`] = true;
    ClassInactive(name);
  } else {
    ClassActive(name);
    fields[name] = false;
  }
}

inputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    ValidateField(input.id, input.value);
  });
  input.addEventListener("blur", () => {
    ValidateField(input.id, input.value);
  });
});

from.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    fields.last == true &&
    fields.first == true &&
    fields.pass == true &&
    fields.email == true
  ) {
    reset();
    Swal.fire({
      icon: "success",
      title: "SUCCESS",
      text: "Data sent.",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "WARNING",
      text: "The form has errors.",
    });
  }
});
