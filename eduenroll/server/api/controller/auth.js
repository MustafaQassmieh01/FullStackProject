import jwt from 'jsonwebtoken';
import {jwtDecode }from 'jwt-decode';
const tokenControl = {
    authenticate:(adminRequired= false) =>
        {
            return (req, res, next) => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            
            if (!token) {
                return res.status(400).json({ error: 'Access token is missing' });
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: 'Invalid access token' });
                }
                req.user = decoded; // Attach user info to request object
                if (adminRequired && !decoded.admin) {
                    return res.status(403).json({ error: 'Admin access required' });
                }
                
                next();
            });
       
        }
    },

    generateRefreshToken: (user) => {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    },

    generateAccessToken: (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    },

    refreshAccessToken: (req, res) => {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken || req.query.refreshToken; // refactor this to only cokies for production
        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token is required' });
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid refresh token' });
            }
            const newAccessToken = tokenControl.generateAccessToken({ id: user.id, username: user.username, admin: user.admin });
            res.json({ accessToken: newAccessToken });
        });
    }

}
export default tokenControl;
/**
 * first log in with username and password to get refresh token
 * then use the refresh token to get access token
 * access token is used to access protected routes
 * refresh token is used to get new access token when it expires
 * access token is valid for 15 minutes
 */