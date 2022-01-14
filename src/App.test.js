import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type } from '@testing-library/user-event/dist/type';
import App from './App';

beforeEach(()=>{
  console.log("This will run before each test");
  render(<App />)
});

beforeAll(()=>{
  console.log("This will run once before all of the test");
});

afterAll(()=>{
  console.log("This will run once after all of the test");
});

afterEach(()=>{
  console.log("This will run after each test");
});

const typeIntroForm = ({email,password,confirmPassword}) => {
  const emailInputElement=screen.getByRole("textbox",{name: /email/i});
  const passwordInputElement=screen.getByLabelText("Password");
  const confirmpasswordInputElement=screen.getByLabelText(/confirm password/i);

  if(email){
    userEvent.type(emailInputElement,email);
  }
  if(password){
    userEvent.type(passwordInputElement,password);
  }
  if(confirmPassword){
    userEvent.type(confirmpasswordInputElement,confirmPassword)
  }

  return{
    emailInputElement,
    passwordInputElement,
    confirmpasswordInputElement
  }
}

// test('renders learn react link', () => {
//    // 1) Rendering the component we want to test
//   render(<App />);
//   // 2) Finding the elements
//   const linkElement = screen.getByText(/learn react/i);
//   // 3)Assertion
//   expect(linkElement).toBeInTheDocument();
// });

// test("inputs should be initially empty", () =>{
//   render(<App />)
//   const emailInputElement=screen.getByRole("textbox");
//   expect(emailInputElement.value).toBe("")
// });

test("inputs should be initially empty", () =>{
  // render(<App />)
  const emailInputElement=screen.getByRole("textbox");
  // const passwordInputElement=screen.getByLabelText(/password/i);
  const passwordInputElement=screen.getByLabelText("Password");
  const confirmpasswordInputElement=screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmpasswordInputElement.value).toBe("");
});

test("should be able to type an email",() =>{
  // render(<App />)
  // const emailInputElement=screen.getByRole("textbox",{name: /email/i});
  // userEvent.type(emailInputElement,"selena@gmail.com");

  const {emailInputElement}= typeIntroForm({email:"selena@gmail.com"})
  expect(emailInputElement.value).toBe("selena@gmail.com");
})

test("should be able to type a password",() =>{
  // render(<App />)
  // const passwordInputElement=screen.getByLabelText("Password");
  // userEvent.type(passwordInputElement,"abcd1234");
  
  const {passwordInputElement} = typeIntroForm({password:"abcd1234"});
  expect(passwordInputElement.value).toBe("abcd1234");
})

test("should be able to type a confirm password",() =>{
  // render(<App />)
  // const confirmpasswordInputElement=screen.getByLabelText(/confirm password/i);
  // userEvent.type(confirmpasswordInputElement,"abcd1234");

  const {confirmpasswordInputElement} = typeIntroForm({confirmPassword:"abcd1234"});
  expect(confirmpasswordInputElement.value).toBe("abcd1234");
})

test("should show email error message on invalid email",()=>{
  // render(<App/>)
  const emailErrorElement=screen.queryByText(/the email you input is invalid/i); // null initially
  // const emailInputElement=screen.getByRole("textbox",{name: /email/i});
  const submitBtnElement=screen.getByRole("button",{
    name:/submit/i
  });
  
  expect(emailErrorElement).not.toBeInTheDocument();
  
  // userEvent.type(emailInputElement,"selenagmail.com");
  typeIntroForm({
    email:"selenagmail.com",
  });
  userEvent.click(submitBtnElement);

  const emailErrorElementAgain=screen.queryByText(/the email you input is invalid/i); 
  expect(emailErrorElementAgain).toBeInTheDocument();
})

test("should show password error if password is less than 5 characters",()=>{
  // render(<App/>)
  // const emailInputElement=screen.getByRole("textbox",{name: /email/i});
  // const passwordInputElement=screen.getByLabelText("Password");
  const passwordError = screen.queryByText(/password you entered should contain 5 or more characters/i)
  const submitBtnElement=screen.getByRole("button",{
    name:/submit/i
  });
  
  // userEvent.type(emailInputElement,"selena@gmail.com");
  typeIntroForm({email:"selna@gmail.com"});
  expect(passwordError).not.toBeInTheDocument();
  
  // userEvent.type(passwordInputElement,"abcd");
  typeIntroForm({password:"1234"});
  userEvent.click(submitBtnElement);

  const passwordErrorAgain = screen.queryByText(/password you entered should contain 5 or more characters/i)
  expect(passwordErrorAgain).toBeInTheDocument();

})

test("should show confirm password error if password is less than 5 characters",()=>{
  // render(<App/>)
  // const emailInputElement=screen.getByRole("textbox",{name: /email/i});
  // const passwordInputElement=screen.getByLabelText("Password");
  const confirmPasswordError = screen.queryByText(/the passwords don't match. try again/i)
  const submitBtnElement=screen.getByRole("button",{
    name:/submit/i
  });

  
  // const confirmpasswordInputElement=screen.getByLabelText(/confirm password/i);
  

  // userEvent.type(emailInputElement,"selena@gmail.com");
  // userEvent.type(passwordInputElement,"12345");
  typeIntroForm({
    email:"selena@gmail.com",
    password:"12345"
  })
  expect(confirmPasswordError ).not.toBeInTheDocument();

  // userEvent.type(confirmpasswordInputElement,"12453");
  typeIntroForm({confirmPassword:"12543"});

  userEvent.click(submitBtnElement)
  const passwordErrorAgain = screen.queryByText(/the passwords don't match. try again/i)
  expect(passwordErrorAgain).toBeInTheDocument();

})

test("should show no error message if every input is valid ",()=>{
  // render(<App/>)
  // const emailInputElement=screen.getByRole("textbox",{name: /email/i});
  // const passwordInputElement=screen.getByLabelText("Password");
  // const confirmpasswordInputElement=screen.getByLabelText(/confirm password/i);
  const submitBtnElement=screen.getByRole("button",{
    name:/submit/i
  });

  // userEvent.type(emailInputElement,"selena@gmail.com");
  // userEvent.type(passwordInputElement,"12345");
  // userEvent.type(confirmpasswordInputElement,"12345");

  typeIntroForm({
    email:"selena@gmail.com",
    password:"12345",
    confirmPassword:"12345"
  })
  
  userEvent.click(submitBtnElement);

  const emailErrorElement=screen.queryByText(/the email you input is invalid/i);
  const passwordErrorAgain = screen.queryByText(/password you entered should contain 5 or more characters/i)
  const confirmPasswordError = screen.queryByText(/the passwords don't match. try again/i)

  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorAgain).not.toBeInTheDocument();
  expect(confirmPasswordError).not.toBeInTheDocument();

})