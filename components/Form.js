const { useState, useEffect } = React;

//! 1. CONTACT DETAIL FORM
const ContactDetails = ({
  contactDetails,
  handleContactDetailsChange,
  cantBeBlank,
  alertEmail,
  alertingEmail,
  alertPhone,
}) => {
  const inputAlert = "input-alert";
  return (
    <form className="contact-detail">
      <div className="form-title">
        <h2>Contact Details</h2>
        <p>
          Please fill out the contact details below so we can get in touch with
          you.
        </p>
      </div>
      <fieldset className="form-wrapper">
        <label htmlFor="nameInput" className="">
          Name
          <div className="input-container">
            <img src="/icons/name.svg" className="contact-detail-icon" />
            <input
              id="nameInput"
              name="name"
              type="text"
              placeholder="Name"
              value={contactDetails.name}
              onChange={handleContactDetailsChange}
              className={
                cantBeBlank && contactDetails.name == "" ? inputAlert : ""
              }
            />
            {cantBeBlank && contactDetails.name == "" ? (
              <p className="empty-alert">Name is required</p>
            ) : (
              ""
            )}
          </div>
        </label>
        <label htmlFor="emailInput">
          Email
          <div className="input-container">
            <img src="/icons/email.svg" className="contact-detail-icon " />
            <input
              id="emailInput"
              name="email"
              type="email"
              placeholder="Email"
              value={contactDetails.email}
              onChange={handleContactDetailsChange}
              className={
                (cantBeBlank && contactDetails.email == "") || alertEmail
                  ? inputAlert
                  : ""
              }
            />
            {cantBeBlank && contactDetails.email == "" ? (
              <p className="empty-alert">Email is required</p>
            ) : (
              ""
            )}
            {alertEmail ? (
              <p className="empty-alert">Email must be @gmail.com</p>
            ) : (
              ""
            )}
          </div>
        </label>
        <label>
          Phone Number
          <div className="input-container">
            <img src="/icons/phone.svg" className="contact-detail-icon " />
            <input
              id="phoneInput"
              name="phone"
              type="tel"
              minLength="10"
              maxLength="14"
              placeholder="Phone"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              value={contactDetails.phone}
              onChange={handleContactDetailsChange}
              className={
                cantBeBlank && contactDetails.phone == "" ? inputAlert : ""
              }
            />
            {cantBeBlank && contactDetails.phone == "" ? (
              <p className="empty-alert">Phone is required</p>
            ) : (
              ""
            )}

            {alertPhone.errorCode === 1 ? (
              <p className="empty-alert">{alertPhone.message}</p>
            ) : alertPhone.errorCode === 2 ? (
              <p className="empty-alert">{alertPhone.message}</p>
            ) : (
              ""
            )}
          </div>
        </label>
        <label>
          Company
          <div className="input-container">
            <img src="/icons/company.svg" className="contact-detail-icon " />
            <input
              id="companyInput"
              name="company"
              type="text"
              placeholder="company"
              value={contactDetails.company}
              onChange={handleContactDetailsChange}
              className={
                cantBeBlank && contactDetails.company == "" ? inputAlert : ""
              }
            />
            {cantBeBlank && contactDetails.company == "" ? (
              <p className="empty-alert">Company is required</p>
            ) : (
              ""
            )}
          </div>
        </label>
      </fieldset>
    </form>
  );
};

//! 2. SELECT SERVICES FORM
const ServiceItem = ({
  serviceName,
  selectedService,
  handleSelectedService,
}) => {
  return (
    <label
      className={`label-radio ${
        selectedService.service == serviceName ? "label-radio-active" : ""
      }`}
    >
      <img src={`icons/${serviceName}-icon.svg`} alt="" />
      <input
        type="radio"
        name="service"
        value={serviceName}
        checked={selectedService.service == serviceName}
        onChange={handleSelectedService}
      />
      {serviceName}
    </label>
  );
};

const SelectServices = ({ selectedService, handleSelectedService }) => {
  const services = ["development", "web design", "marketing", "other"];
  return (
    <form>
      <div className="form-title">
        <h2>Our services</h2>
        <p>Please select which service you are interested in.</p>
      </div>
      <fieldset className="form-wrapper">
        {services.map((service, index) => {
          return (
            <ServiceItem
              key={index}
              serviceName={service}
              selectedService={selectedService}
              handleSelectedService={handleSelectedService}
            />
          );
        })}
      </fieldset>
    </form>
  );
};

//! 3. BUDGET FORM
const BudgetItem = ({ budgetRange, selectedBudget, handleSelectedBudget }) => {
  return (
    <label
      className={`label-radio ${
        selectedBudget.budget === budgetRange ? "label-radio-active" : ""
      }`}
    >
      <div
        className={`radio-circle ${
          selectedBudget.budget === budgetRange ? "radio-circle-active" : ""
        }`}
      >
        {" "}
      </div>
      <input
        type="radio"
        name="budget"
        value={budgetRange}
        checked={selectedBudget.budget == budgetRange}
        onChange={handleSelectedBudget}
      />
      {budgetRange}
    </label>
  );
};

const SelectBudget = ({ selectedBudget, handleSelectedBudget }) => {
  const budgets = [
    "$5.000-$10.000",
    "$10.000-$20.000",
    "$20.000-$50.000",
    "$50.000+",
  ];
  return (
    <form>
      <div className="form-title">
        <h2>What’s your project budget?</h2>
        <p>Please select the project budget range you have in mind.</p>
      </div>
      <fieldset className="form-wrapper">
        {budgets.map((budget, index) => {
          return (
            <BudgetItem
              key={index}
              budgetRange={budget}
              selectedBudget={selectedBudget}
              handleSelectedBudget={handleSelectedBudget}
            />
          );
        })}
      </fieldset>
    </form>
  );
};

//! 4. SUBMIT FORM
const SubmitForm = ({ submitData }) => {
  const [animateChecklist, setAnimateChecklist] = useState(false);
  const [clicked, setClicked] = useState(false);

  function disableButton() {
    if (!clicked) {
      setClicked(true);
    }
  }

  function animate() {
    setAnimateChecklist(!animateChecklist);
  }

  return (
    <div className="submit-form-container">
      <div className="checklist">
        <svg
          width="121"
          height="121"
          viewBox="0 0 121 121"
          fill="none"
          className={animateChecklist ? "flipping" : ""}
        >
          <circle
            cx="60.9199"
            cy="60.0391"
            r="60"
            className={animateChecklist ? "base change-color" : "base"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M86.4634 40.985C88.0255 42.5471 88.0255 45.0798 86.4634 46.6419L54.0121 79.0932C52.45 80.6553 49.9173 80.6553 48.3552 79.0932L35.3747 66.1127C33.8126 64.5506 33.8126 62.0179 35.3747 60.4558C36.9368 58.8937 39.4695 58.8937 41.0316 60.4558L51.1836 70.6079L80.8065 40.985C82.3686 39.423 84.9013 39.423 86.4634 40.985Z"
            fill="white"
          />
        </svg>
      </div>
      <h2>Submit your quote request</h2>
      <p>
        Please review all the information you previously typed in the past
        steps, and if all is okay, submit your message to receive a project
        quote in 24 - 48 hours.
      </p>
      {clicked ? (
        <button className="btn-primary btn-disabled">
          Data has been submitted
        </button>
      ) : (
        <button
          className="btn-primary"
          onClick={() => {
            animate();
            submitData();
            disableButton();
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
};

//* FORM WRAPPER ALL
function Form() {
  //? Input data
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  function handleContactDetailsChange(event) {
    const { name, value } = event.target;
    setContactDetails((prevContactDetails) => ({
      ...prevContactDetails,
      [name]: value,
    }));

    if (name === "phone") {
      if (!value.startsWith("08")) {
        let code = 1;
        let error = 'Phone number must start with "08"';
        setAlertPhone({ errorCode: code, message: error });
      } else if (value.length <= 8 || value.length > 14) {
        let code = 2;
        let error = "Must be between 8 and 14 characters";
        setAlertPhone({ errorCode: code, message: error });
      } else {
        let code = 0;
        let error = "none";
        setAlertPhone({ errorCode: code, message: error });
      }
    }

    if (name === "email") {
      if (value.endsWith("@gmail.com")) {
        setAlertEmail(false);
      } else {
        setAlertEmail(true);
      }
    }
  }

  const [selectedService, setSelectedService] = useState({
    service: "development",
  });

  function handleSelectedService(event) {
    setSelectedService({
      service: event.target.value,
    });
  }

  const [selectedBudget, setSelectedBudget] = useState({
    budget: "$50.000+",
  });
  function handleSelectedBudget(event) {
    setSelectedBudget({
      budget: event.target.value,
    });
  }

  const submitData = () => {
    const formData = {
      ...contactDetails,
      ...selectedService,
      ...selectedBudget,
    };
    alert(JSON.stringify(formData));
  };

  //? SWITCHING BETWEEN FORMS & VALIDATION
  const [step, setStep] = useState(0);
  const [cantBeBlank, setCantBeBlank] = useState(false);
  const [alertEmail, setAlertEmail] = useState(false);
  const [alertPhone, setAlertPhone] = useState({
    errorCode: 0,
    message: "Normal",
  });

  function alertingEmail(event) {
    const { name, value } = event.target;
    if (value.endsWith("@gmail.com")) {
      setAlertEmail(false);
    } else {
      setAlertEmail(true);
    }
  }

  function validateEmail(email) {
    if (email.endsWith("@gmail.com")) {
      return { valid: true };
    }
    return { valid: false };
  }

  function validatePhone(phoneNumber) {
    if (!phoneNumber.startsWith("08")) {
      return { valid: false };
    } else if (phoneNumber.length <= 8 || phoneNumber.length > 14) {
      return { valid: false };
    } else {
      return { valid: true };
    }
  }

  const decreaseStep = () => {
    setStep(step - 1);
  };

  //! IMPORTANT NEXT BUTTON. EVERYTHING HAPPENS HERE!!!!
  const increaseStep = () => {
    const emailValidation = validateEmail(contactDetails.email);
    const phoneValidation = validatePhone(contactDetails.phone);

    if (Object.values(contactDetails).includes("")) {
      setCantBeBlank(true);
    } else if (step < 4 && emailValidation.valid && phoneValidation.valid) {
      setStep(step + 1);
    }
  };

  const formDisplay = () => {
    if (step === 0) {
      return (
        <ContactDetails
          contactDetails={contactDetails}
          handleContactDetailsChange={handleContactDetailsChange}
          cantBeBlank={cantBeBlank}
          alertEmail={alertEmail}
          alertingEmail={alertingEmail}
          alertPhone={alertPhone}
        />
      );
    } else if (step === 1) {
      return (
        <SelectServices
          selectedService={selectedService}
          handleSelectedService={handleSelectedService}
        />
      );
    } else if (step === 2) {
      return (
        <SelectBudget
          selectedBudget={selectedBudget}
          handleSelectedBudget={handleSelectedBudget}
        />
      );
    } else {
      return <SubmitForm submitData={submitData} />;
    }
  };

  return (
    <div className="form">
      <div className="form-container">
        <div className="progress-bar">
          <div className="indicator indicator-active">1</div>
          <div className="bar">
            <div className={`bar-half ${step > 0 ? "bar-full" : ""}`}></div>
          </div>

          <div className={`indicator ${step > 0 ? "indicator-active" : ""}`}>
            2
          </div>
          <div className="bar">
            <div
              className={`bar-none ${
                step == 1 ? "bar-half" : step > 1 ? "bar-full" : ""
              }`}
            ></div>
          </div>

          <div className={`indicator ${step > 1 ? "indicator-active" : ""}`}>
            3
          </div>
          <div className="bar">
            <div
              className={`bar-none ${
                step == 2 ? "bar-half" : step > 2 ? "bar-full" : ""
              }`}
            ></div>
          </div>

          <div className={`indicator ${step > 2 ? "indicator-active" : ""}`}>
            4
          </div>
        </div>
        <div>
          <div className="header"></div>
          <div className="body">{formDisplay()}</div>
        </div>
      </div>

      <div className="footer">
        {step === 0 ? (
          <div></div>
        ) : (
          <button className="btn-secondary" onClick={decreaseStep}>
            Previous Step
          </button>
        )}

        {step >= 3 ? (
          <></>
        ) : (
          <button className="btn-primary" onClick={increaseStep}>
            Next step
          </button>
        )}
      </div>
    </div>
  );
}
