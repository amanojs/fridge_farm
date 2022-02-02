import { NextPage } from 'next';
import RegisterForm from 'components/user/register/RegisterForm';

const register: NextPage = () => {
    return (
        <div className="flex justify-center items-center p-5 min-h-screen h-full bg-slate-700">
            <RegisterForm />
        </div>
    );
};

export default register;
