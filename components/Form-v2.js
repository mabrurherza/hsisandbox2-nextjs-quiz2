const { useState, useEffect, useReducer } = React;

//! 1. CONTACT DETAIL FORM
const ContactDetails = ({
  cantBeBlank,
  handleContactDetailsChange,
  alertEmail,
  alertingEmail,
  alertPhone,
  handleChange,
  state,
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
              value={state.name}
              onChange={handleChange}
              className={cantBeBlank && state.name === "" ? inputAlert : ""}
            />
            {cantBeBlank && state.name === "" ? (
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
              value={state.email}
              onChange={handleChange}
              onBlur={handleContactDetailsChange}
              className={
                (cantBeBlank && state.email == "") || alertEmail
                  ? inputAlert
                  : ""
              }
            />
            {cantBeBlank && state.email == "" ? (
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
              value={state.phone}
              // onChange={() => {
              //   handleChange();
              //   handleContactDetailsChange();
              // }}
              onChange={handleChange}
              onBlur={handleContactDetailsChange}
              className={cantBeBlank && state.phone == "" ? inputAlert : ""}
            />
            {cantBeBlank && state.phone == "" ? (
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
              value={state.company}
              onChange={handleChange}
              className={cantBeBlank && state.company == "" ? inputAlert : ""}
            />
            {cantBeBlank && state.company == "" ? (
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
const ServiceItem = ({ serviceName, handleChange, state }) => {
  return (
    <label
      className={`label-radio ${
        state.service === serviceName ? "label-radio-active" : ""
      }`}
    >
      <img src={`icons/${serviceName}-icon.svg`} alt="" />
      <input
        type="radio"
        name="service"
        value={serviceName}
        checked={state.service === serviceName}
        onChange={handleChange}
      />
      {serviceName}
    </label>
  );
};

const SelectServices = ({ state, handleChange }) => {
  const services = [
    { id: 1, item: "development" },
    { id: 2, item: "web design" },
    { id: 3, item: "marketing" },
    { id: 4, item: "other" },
  ];
  return (
    <form>
      <div className="form-title">
        <h2>Our services</h2>
        <p>Please select which service you are interested in.</p>
      </div>
      <fieldset className="form-wrapper">
        {services.map((service) => {
          return (
            <ServiceItem
              key={service.id}
              serviceName={service.item}
              state={state}
              handleChange={handleChange}
            />
          );
        })}
      </fieldset>
    </form>
  );
};

//! 3. BUDGET FORM
const BudgetItem = ({ budgetRange, handleChange, state }) => {
  return (
    <label
      className={`label-radio ${
        state.budget === budgetRange ? "label-radio-active" : ""
      }`}
    >
      <div
        className={`radio-circle ${
          state.budget === budgetRange ? "radio-circle-active" : ""
        }`}
      >
        {" "}
      </div>
      <input
        type="radio"
        name="budget"
        value={budgetRange}
        checked={state.budget === budgetRange}
        onChange={handleChange}
      />
      {budgetRange}
    </label>
  );
};

const SelectBudget = ({ state, handleChange }) => {
  const budgets = [
    { id: 1, range: "$5.000-$10.000" },
    { id: 2, range: "$10.000-$20.000" },
    { id: 3, range: "$20.000-$50.000" },
    { id: 4, range: "$50.000+" },
  ];

  return (
    <form>
      <div className="form-title">
        <h2>What’s your project budget?</h2>
        <p>Please select the project budget range you have in mind.</p>
      </div>
      <fieldset className="form-wrapper">
        {budgets.map((budget) => {
          return (
            <BudgetItem
              key={budget.id}
              budgetRange={budget.range}
              state={state}
              handleChange={handleChange}
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
  const INITIAL_STATE = {
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "development",
    budget: "$50.000+",
  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT": {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      }
      default: {
        return { state };
      }
    }
  };

  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  //   console.log(state);

  function handleContactDetailsChange(event) {
    const { name, value } = event.target;

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

  const submitData = () => {
    alert(JSON.stringify(state));
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
    const emailValidation = validateEmail(state.email);
    const phoneValidation = validatePhone(state.phone);

    if (Object.values(state).includes("")) {
      setCantBeBlank(true);
    } else if (step < 4 && emailValidation.valid && phoneValidation.valid) {
      setStep(step + 1);
    }
  };

  const formDisplay = () => {
    if (step === 0) {
      return (
        <ContactDetails
          cantBeBlank={cantBeBlank}
          alertEmail={alertEmail}
          alertingEmail={alertingEmail}
          alertPhone={alertPhone}
          handleChange={handleChange}
          handleContactDetailsChange={handleContactDetailsChange}
          state={state}
        />
      );
    } else if (step === 1) {
      return <SelectServices state={state} handleChange={handleChange} />;
    } else if (step === 2) {
      return <SelectBudget state={state} handleChange={handleChange} />;
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
