import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type } from '@testing-library/user-event/dist/type';
import App from './App';

// beforeEach(()=>{
//   console.log("This will run before each test");
//   render(<App />)
// });

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

const clickonSubmit = () => {
  const submitBtnElement=screen.getByRole("button",{
    name:/submit/i
  });
  userEvent.click(submitBtnElement);
}

describe("App",() =>{

  beforeEach(()=>{
    console.log("This will run before each test");
    render(<App />)
  });

  test("inputs should be initially empty", () =>{
  
    expect(screen.getByRole("textbox").value).toBe("");
    expect(screen.getByLabelText("Password").value).toBe("");
    expect(screen.getByLabelText(/confirm password/i).value).toBe("");
  
  });
  
  test("should be able to type an email",() =>{
   
    const {emailInputElement}= typeIntroForm({email:"selena@gmail.com"})
    expect(emailInputElement.value).toBe("selena@gmail.com");
  
  });
  
  test("should be able to type a password",() =>{
    
    const {passwordInputElement} = typeIntroForm({password:"abcd1234"});
    expect(passwordInputElement.value).toBe("abcd1234");
  
  })
  
  test("should be able to type a confirm password",() =>{
    
    const {confirmpasswordInputElement} = typeIntroForm({confirmPassword:"abcd1234"});
    expect(confirmpasswordInputElement.value).toBe("abcd1234");
  
  })
  
  describe("Error Handling",() => {

    beforeEach(()=>{
      console.log("Hello");
    })
  
    test("should show email error message on invalid email",()=>{
      
      expect(screen.queryByText(/the email you input is invalid/i)).not.toBeInTheDocument();
    
      typeIntroForm({
        email:"selenagmail.com",
      });
     
      clickonSubmit();
      
      expect(screen.queryByText(/the email you input is invalid/i)).toBeInTheDocument();
    
    })
    
    test("should show password error if password is less than 5 characters",()=>{
      
      typeIntroForm({email:"selna@gmail.com"});
      
      expect(screen.queryByText(/password you entered should contain 5 or more characters/i)).not.toBeInTheDocument();
     
      typeIntroForm({password:"1234"});
     
      clickonSubmit();
      
      expect(screen.queryByText(/password you entered should contain 5 or more characters/i)).toBeInTheDocument();
    
    })
    
    test("should show confirm password error if password is less than 5 characters",()=>{
      
      typeIntroForm({
        email:"selena@gmail.com",
        password:"12345"
      })
      
    expect(screen.queryByText(/the passwords don't match. try again/i)).not.toBeInTheDocument();
      
      typeIntroForm({confirmPassword:"12543"});
    
      clickonSubmit();
      
      expect(screen.queryByText(/the passwords don't match. try again/i)).toBeInTheDocument();
    
    })
    
    test("should show no error message if every input is valid ",()=>{
      
      typeIntroForm({
        email:"selena@gmail.com",
        password:"12345",
        confirmPassword:"12345"
      })
    
      clickonSubmit();
    
      expect(screen.queryByText(/the email you input is invalid/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/password you entered should contain 5 or more characters/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/the passwords don't match. try again/i)).not.toBeInTheDocument();
      
    })
  })
  
})

