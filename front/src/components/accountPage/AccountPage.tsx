/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** accountPage
*/

import React from 'react';
import NavBar from '../navbar/Navbar';
// import { useNavigate } from 'react-router-dom';

// interface AccountCreationFormState  {
//   email: string;
//   password: string;
//   name: string;
//   surname: string;
//   birth_date: string;
//   gender: string;
//   work: string;
// }

const AccountPage: React.FC = () => {

  // const navigate = useNavigate();
  // const [formData, setFormData] = useState<AccountCreationFormState> ({
  //   email: '',
  //   password: '',
  //   name: '',
  //   surname: '',
  //   birth_date: '',
  //   gender: '',
  //   work: '',
  // })

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const {name, value} = e.target;
  //   setFormData(prevData => ({...prevData, [name]: value}));
  // }

  // const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
  //   e.preventDefault();
  //   try {
  //     const res: AxiosResponse = await axios.post('http://localhost:3001/employees/login', formData);
  //     if (res.data === "OK") {
  //       setAuthenticated(true);
  //       navigate("/dashboard");
  //     }
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       console.error("Cannot post the form");
  //     }
  //   }
  // }

  return (
    <>
      <NavBar/>
      <div>
        <h1>Welcome to the Account page!</h1>
      </div>
    </>
    // <section className='account'>
    //     <h3>Create employee</h3>

    //     <form onSubmit={handleSubmit}>
    //       <label htmlFor='email'>Username</label>
    //       <input
    //         className="login-box"
    //         type="email"
    //         name="email"
    //         id='email'
    //         placeholder="Email"
    //         onChange={handleChange}
    //         value={formData.email}
    //         required
    //         maxLength={40}
    //       />

    //       <label htmlFor='password'>Password</label>
    //       <input
    //         className="login-box"
    //         type="password"
    //         name="password"
    //         id="pass"
    //         placeholder="Password"
    //         onChange={handleChange}
    //         value={formData.password}
    //         required
    //         maxLength={40}
    //       />

    //       <label htmlFor='name'>Name</label>
    //       <input
    //         className="login-box"
    //         type="name"
    //         name="name"
    //         id='name'
    //         placeholder="Name"
    //         onChange={handleChange}
    //         value={formData.name}
    //         required
    //         maxLength={40}
    //       />

    //       <label htmlFor='surname'>Surname</label>
    //       <input
    //         className="login-box"
    //         type="surname"
    //         name="surname"
    //         id='surname'
    //         placeholder="Surname"
    //         onChange={handleChange}
    //         value={formData.surname}
    //         required
    //         maxLength={40}
    //       />

    //       <label htmlFor='birth_date'>Birth Date</label>
    //       <input
    //         className="login-box"
    //         type="birth_date"
    //         name="birth_date"
    //         id='birth_date'
    //         placeholder="Birth Date"
    //         onChange={handleChange}
    //         value={formData.birth_date}
    //         required
    //         maxLength={40}
    //       />

    //       <label htmlFor='gender'>Gender</label>
    //       <input
    //         className="login-box"
    //         type="gender"
    //         name="gender"
    //         id='gender'
    //         placeholder="Gender"
    //         onChange={handleChange}
    //         value={formData.gender}
    //         required
    //         maxLength={40}
    //       />

    //       <label htmlFor='work'>Work</label>
    //       <input
    //         className="login-box"
    //         type="work"
    //         name="work"
    //         id='work'
    //         placeholder="Work"
    //         onChange={handleChange}
    //         value={formData.work}
    //         required
    //         maxLength={40}
    //       />

    //       <button type='submit'>Create</button>
    //     </form>
    // </section>
  );
};

export default AccountPage;