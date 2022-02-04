import { FC, useState } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EmotionIcon from '@mui/icons-material/InsertEmoticonTwoTone';
import Link from 'next/link';
import FridgeIcon from '../../../assets/image/fridge.png';
import Image from 'next/image';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import ErrorTwoTone from '@mui/icons-material/ErrorRounded';
import InputLabel from '@mui/material/InputLabel';

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
        <Card className="w-full min-h-screen md:min-h-full p-5 md:w-3/4 md:mb-20 lg:w-2/4 lg:px-10 lg:pb-9">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto sm:w-2/6 md:w-4/6 lg:w-2/6 flex justify-center">
                    <Image src={FridgeIcon} alt="fridge_logo" />
                </div>
                <h3>ニックネームを決めましょう</h3>
                {registError && (
                    <p className="flex items-center text-red-500 text-sm">
                        <ErrorTwoTone className="mr-1" fontSize="small" />
                        登録エラー
                    </p>
                )}
                <TextField
                    fullWidth
                    variant="outlined"
                    color="primary"
                    error={Boolean(errors.nickname)}
                    helperText={errors.nickname?.message}
                    {...register('nickname', validateRule.nickname)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmotionIcon color={Boolean(errors.nickname) ? 'error' : 'primary'} />
                            </InputAdornment>
                        )
                    }}
                />
                <InputLabel className="pl-2 pt-1 text-xs text-gray-400">{`${ruleVal.nickname.minLength}文字以上${ruleVal.nickname.maxLength}文字以下`}</InputLabel>

                <div className="pt-5">
                    <Button
                        type="submit"
                        color="primary"
                        size="large"
                        variant="contained"
                        disableElevation
                        className="py-3 w-full md:py-2 lg:w-3/12"
                    >
                        登録
                    </Button>
                    <Link href={'/'} passHref>
                        <Button
                            color="inherit"
                            size="large"
                            variant="text"
                            disableElevation
                            className="w-full py-3 mt-1 text-gray-700 md:py-2 lg:mt-0 lg:w-3/12 lg:ml-1"
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
