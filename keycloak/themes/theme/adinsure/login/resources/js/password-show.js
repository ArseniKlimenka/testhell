const toggle = (button) =>  {
	const passwordElement = document.getElementById(button.getAttribute('aria-controls'));
	if (passwordElement.type === "password") {
		passwordElement.type = "text";
		button.setAttribute("aria-label", button.dataset.labelHide);
		button.children.item(0).classList.remove("fa-eye-slash");
		button.children.item(0).classList.add("fa-eye");
	} else if(passwordElement.type === "text") {
		passwordElement.type = "password";
		button.setAttribute("aria-label", button.dataset.labelShow);
		button.children.item(0).classList.remove("fa-eye");
		button.children.item(0).classList.add("fa-eye-slash");
	}
}

document.querySelectorAll('[data-password-toggle]').forEach(button => button.onclick = () => toggle(button));