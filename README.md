# **TRIPPY ROOM BOOKING**

TRIPPY ROOM BOOKING is a web-based application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to book rooms seamlessly and enables administrators to manage bookings efficiently.

---

## **Features**

### **For Users**
- User registration and login.
- View available rooms with details.
- Book rooms based on availability.
- Cancel existing bookings.

### **For Admins**
- Add, edit, and delete rooms.
- View and manage user bookings.
- Cancel or remove bookings as necessary.

---

## **Technologies Used**

### **Frontend**
- **React.js**: For building the user interface.
- **Axios**: For making API requests.

### **Backend**
- **Node.js**: Server-side runtime.
- **Express.js**: For routing and APIs.

### **Database**
- **MongoDB**: For storing user, room, and booking information.

### **Deployment**
- **AWS EC2**: Hosting the application.
- **PM2**: Process management for ensuring uptime.
- **Nginx**: Reverse proxy server for managing requests.

---

## **Setup Instructions**

### **Prerequisites**
- Node.js
- MongoDB Atlas (or local MongoDB instance)
- AWS EC2 instance (optional for deployment)

## Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/trippy-room-booking.git
```
```
cd trippy-room-booking
```
## Step 2: Backend Setup
#### 1.Navigate to the backend directory:
```bash
cd backend
```
#### 2.Install dependencies:
```bash
npm install
```
#### 3.Create a .env file in the backend directory and add the following environment variables:
```.env
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
PORT=5000
```
#### 4.Start the backend server:
```bash
npm server.js
```
#### 5.Verify the backend API is running at http://localhost:5000.

## Step 3: Frontend Setup
#### 1.Navigate to the frontend directory:
```bash
cd frontend
```
#### 2.Install dependencies:
```bash
npm install
```
#### 3.Start the development server:
```bash
npm run dev
```
#### 4.Open your browser and go to http://localhost:3000.

## Step 4: Deployment on AWS EC2
- ### Step 4.1: Set Up Your EC2 Instance
#### 1.Launch an AWS EC2 instance using the Ubuntu AMI.
#### 2.Connect to your instance using SSH:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```
- ### Step 4.2: Install Required Software
Run the following commands to install Node.js, PM2, and Nginx:
```bash
sudo apt update
sudo apt install -y nginx
sudo apt install -y nodejs npm
sudo npm install -g pm2
```
- ### Step 4.3: Deploy the Backend
#### 1.Copy the backend files to your EC2 instance using SCP or Git.
#### 2.Navigate to the backend directory on the server and install dependencies:
```bash
cd backend
npm install
```
#### 3.Start the backend server using PM2:
```bash
pm2 start server.js --name trippy-backend
pm2 sartup
```
#### 4.Copy and past the output of pm2 startup
```bash
pm2 save
```
- ### Step 4.4: Deploy the Frontend
#### 1.Build the React application:
```bash
cd frontend
npm install
npm run build
```
####  2.Copy the build files to the Nginx default web directory:
```bash
Copy code
sudo cp -r build/* /var/www/html/
```
- ### Step 4.5: Configure Nginx
####  1.Open the Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/default
```
#### 2.Update the configuration as follows:
```nginx
server {
    listen 80;

    server_name your-domain-or-ip;

    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /var/www/html;
        index index.html;
        try_files $uri /index.html;
    }
}
```
#### 3.Save and exit the file, then restart Nginx:
```bash
sudo systemctl restart nginx
```
## Step 5: Monitoring and Management
- Use PM2 to ensure the backend stays alive:
```bash
pm2 monit
```
- Monitor PM2 logs:
```bash
pm2 logs
```
Contributing
We welcome contributions to enhance the functionality of the TRIPPY ROOM BOOKING project. Feel free to fork the repository, create a branch for your changes, and submit a pull request.
## License
This project is licensed under the MIT License - see the LICENSE file for details.
```markdown

### Notes:
- I added additional formatting to improve the readability of the steps, especially for navigation between sections.
- The setup steps now include an easy-to-follow guide for backend, frontend, and AWS EC2 deployment, with clear separation between the individual steps.

```
