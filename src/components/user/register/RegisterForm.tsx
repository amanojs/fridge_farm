import { FC, useState } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import FridgeIcon from '../../../assets/image/fridge.png';
import Image from 'next/image';
import axios from 'axios';

type InputFields<T> = {
    nickname: T;
};

const ruleVal: InputFields<RegisterOptions> = {
    nickname: {
        minLength: 4,
        maxLength: 16
    }
};
const validateRule: InputFields<RegisterOptions> = {
    nickname: {
        required: { value: true, message: '必須項目です' },
        minLength: {
            value: Number(ruleVal.nickname.minLength),
            message: 'ニックネームは' + ruleVal.nickname.minLength + '文字以上で入力してください'
        },
        maxLength: {
            value: Number(ruleVal.nickname.maxLength),
            message: 'ニックネームは' + ruleVal.nickname.maxLength + '文字以内で入力してください'
        }
    }
};

// useFormのジェネリクスで使用する型
interface Inputs extends InputFields<string | number> {
    nickname: string;
}

const RegisterForm: FC = () => {
    const [registError, setRegistError] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log('form data', data);
        registReq();
    };

    const registReq = async (): Promise<void> => {
        try {
            // TODO: ローディング処理を追加する
            // TODO: 登録リクエスト 未完成 完成させる
            const result = await axios.post('/api/regist');
        } catch (err) {
            setRegistError(true);
        }
    };

    return (
        <Card className="w-full h-full p-5 md:w-3/4 md:mb-20 lg:w-2/4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto sm:w-2/6 md:w-4/6 lg:w-2/6 flex justify-center">
                    <Image src={FridgeIcon} alt="fridge_logo" />
                </div>
                <h3>ニックネームを決めましょう</h3>
                <p className="text-red-500 text-sm">{registError && '登録エラー'}</p>
                <TextField
                    fullWidth
                    variant="outlined"
                    label={`ニックネーム（${ruleVal.nickname.minLength}文字以上${ruleVal.nickname.maxLength}文字以下）`}
                    color="warning"
                    error={Boolean(errors.nickname)}
                    helperText={errors.nickname?.message}
                    {...register('nickname', validateRule.nickname)}
                />

                <div className="pt-5">
                    <Button
                        type="submit"
                        color="warning"
                        size="large"
                        variant="contained"
                        disableElevation
                        className="py-2 w-full lg:w-3/12"
                    >
                        登録
                    </Button>
                    <Link href={'/'} passHref>
                        <Button
                            color="inherit"
                            size="large"
                            variant="text"
                            disableElevation
                            className="w-full py-2 mt-1 text-gray-700 lg:mt-0 lg:w-3/12 lg:ml-1"
                        >
                            戻る
                        </Button>
                    </Link>
                </div>
            </form>
        </Card>
    );
};

export default RegisterForm;
