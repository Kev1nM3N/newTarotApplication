import emailjs from "@emailjs/browser";

export const sendEmail = (e, form) => {
    e.preventDefault();
    const loading = document.querySelector(`.modal__overlay--loading`);
    const success = document.querySelector(`.modal__overlay--success`);
    loading.classList += ` modal__overlay--visible`

    emailjs.sendForm(
        process.env.REACT_APP_SERVICE_ID, 
        process.env.REACT_APP_TEMPLATE_ID, 
        form.current, 
        process.env.REACT_APP_PUBLIC_KEY
    )
      .then((result) => {
          console.log(result.text);
          loading.classList.remove(`modal__overlay--visible`);
          success.classList += ` modal__overlay--visible`
      }, (error) => {
          console.log(error.text);
          loading.classList.remove(`modal__overlay--visible`);
          alert(`The email service is temporaily unavailable. Please contact me directly at mediaman501@outlook.com`);
      });
};