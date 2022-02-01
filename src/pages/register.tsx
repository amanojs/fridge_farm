import { NextPage } from 'next';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';

const Register: NextPage = () => {
    return (
        <div className="p-5 bg-slate-500 mx-auto lg:container">
            <Card className="w-full md:w-2/4 mx-auto p-5">
                <form>
                    <div>[画像]</div>
                    <h3>ニックネームを決めましょう</h3>

                    <TextField fullWidth label="ユーザ名" variant="outlined" />

                    <div className="pt-5">
                        <Button
                            color="info"
                            size="large"
                            variant="contained"
                            disableElevation
                            className="py-2 w-full lg:w-3/12"
                        >
                            登録
                        </Button>
                        <Button
                            color="info"
                            size="large"
                            variant="text"
                            disableElevation
                            className="w-full py-2 mt-1 lg:mt-0 lg:w-3/12 lg:ml-1"
                        >
                            戻る
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Register;
