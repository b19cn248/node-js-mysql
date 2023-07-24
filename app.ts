import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

// Mô phỏng cơ sở dữ liệu người dùng (thông tin đã đăng ký trước)
const users = [
    {
        id: 1,
        email: 'user@example.com',
        password: '$2a$12$VEgVSvaY68Tla9FV5ruBruGB9f5u/0PDq8inJjjeAwIv1vsJQp8sK', // Mật khẩu: 'password'
    },
];

// Phương thức đăng nhập
app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Tìm người dùng với email được cung cấp
    const user = users.find((u) => u.email === email);

    if (!user) {
        return res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo mã thông báo JWT
    const accessToken = jwt.sign({ email: user.email }, 'your-secret-key', {
        expiresIn: '1h', // Thời gian sống của mã thông báo (ở đây là 1 giờ)
    });

    // Trả về email và accessToken
    res.json({ email: user.email, accessToken });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
