import React,{useState} from 'react'
const regularEmail = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const initState ={
    firstName:null,
    lastName: null,
    email:null,
    password:null,
    repeatPassword:null,
    FormErrors : {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword:'',
    }
}
export default function FormComponenets() {
    const [formdata, setformdata] = useState(initState)
    const submitHandlaer = async (e)=>{
        e.preventDefault();
        let form = e.target;
        let allInputs = document.querySelectorAll('input');
        await dontEmptyInput(allInputs)
        let valid = Object.values(formdata.FormErrors);
        console.log(formdata)
        let onsubmits = valid.map(element => {
            if(element === ''){
                return 'true'
            }else{
                return 'false'
            }
            
        });

        if (!(onsubmits.includes('false'))){
            alert('Your data has been successfully sent');
            console.table(formdata);
            form.reset()
        }
    }
    const dontEmptyInput =(inputs)=>{

        const formError = formdata.FormErrors;
        inputs.forEach((element) => {
            if(element.value.length === 0){
                element.style.border ="1px solid red";
                formError[element.name]= 'The input is empty';
                setformdata((prevState) => {
                    return{
                        ...prevState,
                        FormErrors: formError
                    }
                });
            }else{
                element.style.border = "1px solid #cacaca";
            }
        });
    }
    const handelChenge =(e)=>{
        const formError = formdata.FormErrors;
        const {name , value} = e.target;
        const input = e.target;

            switch (name) {
                case 'firstName':
                     if (value.length >= 3) {
                          formError.firstName ='';
                         input.style.border = "1px solid #cacaca"
                     } else {
                          input.style.border = "1px solid red";
                         formError.firstName = 'minmum 3 characaters required'
                     }
                    break;
                case 'lastName':
                    if (value.length >= 3) {
                        formError.lastName = '';
                        input.style.border = "1px solid #cacaca"
                    } else {
                         input.style.border = "1px solid red";
                        formError.lastName = 'minmum 3 characaters required'
                    }
                    break;
                case 'email':
                    if (regularEmail.test(value) && value.length > 3){
                        formError.email ='';
                        input.style.border = "1px solid #cacaca"
                    }else{
                         input.style.border = "1px solid red";
                        formError.email = 'email format not valid';
                    }
                    break;
                case 'password':
                    if ( value.length >= 6) {
                        formError.password = '';
                        input.style.border = "1px solid #cacaca"
                    } else {
                         input.style.border = "1px solid red";
                        formError.password = 'minmum 6 characaters required';
                    }
                    break;
                case 'repeatPassword':
                    if (value.length >= 6) {
                        formError.password = '';
                        input.style.border = "1px solid #cacaca";
                        console.log(`${value.toString()} === ${(formdata.password).toString()}`, (value.toString() === (formdata.password).toString()))
                       formError.repeatPassword = (value.toString() === (formdata.password).toString()) ? '' : 'Repeat Password filde and Password filde Not Equals !'
                    } else {
                        input.style.border = "1px solid red";
                        formError.repeatPassword = 'minmum 6 characaters required';
                    }
                    break;
                default:
                    break;
            }
            setformdata(prevState => {
                return { 
                    ...prevState,
                    [name] : value,
                    FormErrors: formError
                }
            })
    }
    return (
        <div className="form-wrapper">
            <h1>Create Account</h1>
            <form id='form-create-account' onSubmit={e => submitHandlaer(e)} noValidate>
                <div className="form-group-md w-50">
                    <label htmlFor="First_Name">First Name</label>
                    <input 
                    type="text" 
                    id ="First_Name"
                    name = "firstName"
                    className="form-control" 
                    defaultValue=""
                    placeholder="First Name"
                    onChange={handelChenge}
                    />
                    <span className="errorMassage">
                    {formdata.FormErrors.firstName}</span>
                </div>
                < div className = "form-group-md w-50" >
                    <label htmlFor="Last_Name">Last Name</label>
                    <input 
                    type="text" 
                    id ="Last_Name"
                    name = "lastName"
                    className="form-control" 
                    defaultValue=""
                    placeholder="First Name"
                    onChange={handelChenge}
                    />
                    <span className="errorMassage">{formdata.FormErrors.lastName}</span>
                    

                </div>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input 
                    type="email" 
                    id ="email"
                    name="email" 
                    className="form-control" 
                    defaultValue=""
                    placeholder="youereamil@gmail.com"
                    onChange={handelChenge}
                    />
                    <span className="errorMassage">{formdata.FormErrors.email}</span>
                    

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    id ="password"
                    name="password" 
                    className="form-control" 
                    defaultValue=""
                    placeholder=""
                    onChange={handelChenge}
                    />
                    <span className="errorMassage">{formdata.FormErrors.password}</span>
                </div>
                                <div className="form-group">
                    <label htmlFor = "repeat_password"> Repeat Password </label>
                    <input 
                    type="password" 
                    id = "repeat_password"
                    name = "repeatPassword"
                    className="form-control" 
                    defaultValue=""
                    placeholder=""
                    onChange={handelChenge}
                    />
                    <span className="errorMassage">{formdata.FormErrors.repeatPassword}</span>
                    

                </div>
                <div className="form-group-btn">
                    <button className="btn  btn-primary">Create Account</button>
                </div>
            </form>
        </div>
    )
}
