import { useEffect } from "react";
import { useForm } from "react-hook-form";
import './styles/FormUser.css'
import Swal from "sweetalert2";

const FormUser = ({
    createUser, 
    userSelected, 
    setUserSelected, 
    updateUser,
    setFormIsOpen,
    formIsOpen,  
}) => {
    const {
        handleSubmit, 
        register, 
        reset, 
        formState: {errors}
    } = useForm({mode: onchange});

    useEffect(() => {
        reset(userSelected);
    }, [userSelected]);
    
    const submit = (data) => {

        if (userSelected) {
            updateUser(userSelected.id, data)
            setUserSelected();
            Swal.fire({
                position: "¿SuperProfe Updeated",
                icon: "success",
                title: `SuperProfe ${userSelected.first_name} ${userSelected.last_name} has been updated`,
                showConfirmButton: false,
                timer: 1500
              });
        } else {
            createUser(data);
            Swal.fire({
                position: "SuperProfe Created",
                icon: "success",
                title: `SuperProfe ${data.first_name} ${data.last_name} has been created`,
                showConfirmButton: false,
                timer: 1500
              });
        }
        reset({
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            birthday: '',
            image_url: '',
        });
        setFormIsOpen(false);
    };

    const handleExit = () => { 
        setFormIsOpen(false)
        reset({
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            birthday: '',
            image_url: '',
        }); 
        setUserSelected();
    }

    return(  
        <div className={`form__container flex-container ${formIsOpen || 'form__close'}`}>
            <form className="form flex-container" onSubmit={handleSubmit(submit)}>
                <span className="form__exit flex-container" onClick={handleExit}>
                    <i className="bx bx-x"></i>
                </span>
                <h2 className="form__title">
                    {userSelected ? 'Update User Form' : 'Create User Form'}
                </h2>
                <div className="form__list">
                    <label className="form__field grid-container">
                        <span className="form__label">Email</span>
                        <input className={`form__input ${errors.email ? 'form__input--error' : ''}`} type="email" { ...register('email', {
                            maxLength:{
                            value: 50,
                            message: 'the maximum number of characters is 50',
                            }, 
                            required: 'This field is required',
                        })} 
                        />
                        <p className="form__error">{errors.email?.message}</p>
                    </label>
                    <label className="form__field grid-container">
                        <span className="form__label">Password</span>
                        <input className={`form__input ${errors.password ? 'form__input--error' : ''}`} type="password" { ...register('password', {
                            maxLength:{
                            value: 15,
                            message: 'the maximum number of characters is 15',
                            }, 
                            required: 'This field is required',
                        })} 
                        />
                        <p className="form__error">{errors.password?.message}</p>
                    </label>
                    <label className="form__field grid-container">
                        <span className="form__label">First Name</span>
                        <input className={`form__input ${errors.first_name ? 'form__input--error' : ''}`} type="text" { ...register('first_name', {
                            maxLength:{
                            value: 20,
                            message: 'the maximum number of characters is 20',
                            }, 
                            required: 'This field is required',
                        })} 
                        />
                        <p className="form__error">{errors.first_name?.message}</p>
                    </label>
                    <label className="form__field grid-container">
                        <span className="form__label">Last Name</span>
                        <input className={`form__input ${errors.last_name ? 'form__input--error' : ''}`} type="text" { ...register('last_name', {
                            maxLength:{
                            value: 20,
                            message: 'the maximum number of characters is 20',
                            }, 
                            required: 'This field is required',
                        })} 
                        />
                        <p className="form__error">{errors.last_name?.message}</p>
                    </label>
                    <label className="form__field grid-container">
                        <span className="form__label">Birthday</span>
                        <input className={`form__input ${errors.birthday ? 'form__input--error' : ''}`} type="date" { ...register('birthday', {
                            maxLength:{
                            value: 10,
                            message: 'the maximum number of characters is 10',
                            }, 
                            required: 'This field is required',
                        })} 
                        />
                        <p className="form__error">{errors.birthday?.message}</p>
                    </label>
                    <label className="form__field grid-container">
                        <span className="form__label">Img Url</span>
                        <input className={`form__input ${errors.image_url ? 'form__input--error' : ''}`} type="text" { ...register('image_url', { 
                            required: 'This field is required',
                        })} 
                        />
                        <p className="form__error">{errors.image_url?.message}</p>
                    </label>
                 </div>
                <button className="form__btn">{userSelected ? 'Update' : 'Create'}</button>
            </form> 
        </div>
    );
};

export default FormUser