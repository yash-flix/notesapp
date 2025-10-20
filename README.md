# Notes App - Full Stack React Application

A full-stack serverless notes application built with **React**, **AWS Amplify Gen 2**, **TypeScript**, and deployed on AWS cloud infrastructure. This application allows users to securely create, manage, and delete notes with image attachments.

## 🚀 Live Demo

Visit the deployed app: `https://main.amplifyapp.com` *(Replace with your actual Amplify URL)*

## ✨ Features

- **User Authentication** - Secure email-based sign up/sign in with AWS Cognito
- **CRUD Operations** - Create, read, update, and delete notes
- **Image Upload** - Attach images to notes stored in AWS S3
- **Real-time Sync** - Automatic data synchronization across devices
- **Responsive UI** - Built with Amplify UI components
- **Owner-based Authorization** - Users can only access their own notes
- **Continuous Deployment** - Automatic deployment on every git push

## 🏗️ Architecture

The application uses the following AWS services [file:266]:

- **AWS Amplify** - Hosting, CI/CD, and fullstack backend
- **Amazon Cognito** - User authentication and authorization
- **AWS AppSync** - GraphQL API for data operations
- **Amazon DynamoDB** - NoSQL database for storing notes
- **Amazon S3** - Object storage for note images
- **AWS CloudFormation** - Infrastructure as Code

## 📋 Prerequisites

Before you begin, ensure you have [file:266]:

- **Node.js** (v18 or later) and npm installed
- **AWS Account** - [Create one here](https://aws.amazon.com/free/)
- **Git** and **GitHub account**
- **AWS CLI** configured for local development
- A text editor (VS Code, Atom, Sublime, etc.)

## 🛠️ Installation & Setup

### 1. Clone the Repository

git clone https://github.com/yash-flix/notesapp.git
cd notesapp

text

### 2. Install Dependencies

npm install

text

### 3. Configure AWS Credentials

Set up AWS IAM Identity Center for local development [file:266]:

aws configure sso

text

Follow the prompts to configure your AWS profile:
- SSO session name: `amplify-admin`
- SSO start URL: *(from your IAM Identity Center)*
- SSO region: `your-region` (e.g., `us-east-1`)
- Profile name: `default`

### 4. Start the Development Sandbox

Launch the Amplify sandbox environment [file:266]:

npx ampx sandbox

text

This creates an isolated cloud backend for development. The first run will require bootstrapping your AWS account (takes 3-5 minutes).

### 5. Run the Application Locally

In a separate terminal window [file:266]:

npm run dev

text

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

notesapp/
├── amplify/ # Backend configuration
│ ├── auth/
│ │ └── resource.ts # Authentication setup
│ ├── data/
│ │ └── resource.ts # GraphQL schema & authorization
│ ├── storage/
│ │ └── resource.ts # S3 storage configuration
│ └── backend.ts # Backend resource definitions
├── src/
│ ├── App.jsx # Main application component
│ ├── index.css # Styling
│ └── main.jsx # Entry point
├── amplify_outputs.json # Generated backend config
├── package.json
└── vite.config.js

text

## 🔧 Backend Configuration

### Authentication (Cognito)

Configured in `amplify/auth/resource.ts` [file:266]:
- Email-based login
- Password verification
- Multi-factor authentication support

### Data Model (AppSync + DynamoDB)

Schema defined in `amplify/data/resource.ts` [file:266]:

Note {
id: ID!
name: String!
description: String!
image: String
owner: String! // Auto-generated
}

text

**Authorization**: Owner-based access control - users can only manage their own notes.

### Storage (S3)

Configured in `amplify/storage/resource.ts` [file:266]:
- Image uploads stored at `media/{identityId}/*`
- Per-user access control
- Supported formats: PNG, JPEG

## 🎨 Frontend Features

### Amplify Authenticator Component

Provides complete authentication UI [file:266]:
- Sign up
- Sign in
- Password reset
- Email verification
- MFA confirmation

### Core Functions

**fetchNotes()** - Retrieves all user notes and associated images from S3

**createNote()** - Creates a new note with optional image upload

**deleteNote()** - Deletes a note and removes associated data

## 🚀 Deployment

### Deploy to AWS Amplify Hosting

1. **Connect GitHub Repository** [file:266]

   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/apps)
   - Click **Create new app**
   - Connect your GitHub repository
   - Select the `main` branch

2. **Configure Build Settings** [file:266]

   Amplify auto-detects build settings:
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Deploy**

   Click **Save and deploy**. Amplify will:
   - Build your application
   - Deploy to global CDN
   - Provide a URL: `https://main.amplifyapp.com`

### Continuous Deployment

Every push to the `main` branch triggers automatic deployment [file:266].

## 🧪 Usage

### Create an Account

1. Navigate to the deployed URL
2. Click **Create Account**
3. Enter email and password
4. Verify your email with the code sent

### Manage Notes

- **Create Note**: Fill in name, description, and optionally upload an image
- **View Notes**: All your notes displayed in a grid layout
- **Delete Note**: Click the delete button on any note

## 🧹 Cleanup

To avoid AWS charges, delete resources when done [file:266]:

1. **Delete Amplify App**
   - Go to Amplify Console → App Settings → General Settings
   - Click **Delete app**

2. **Delete Local Sandbox**
npx ampx sandbox delete

text

## 📚 Technologies Used

- **Frontend**: React 18, Vite, Amplify UI React
- **Backend**: AWS Amplify Gen 2, TypeScript
- **Authentication**: Amazon Cognito
- **Database**: Amazon DynamoDB (via AWS AppSync)
- **Storage**: Amazon S3
- **Hosting**: AWS Amplify Hosting
- **CI/CD**: AWS Amplify Git-based workflow

## 📖 Learn More

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Amplify Gen 2 Documentation](https://docs.amplify.aws/react/)
- [Amplify UI Components](https://ui.docs.amplify.aws/react)
- [AWS Free Tier](https://aws.amazon.com/free/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built following the [AWS Amplify Full Stack React Tutorial](https://docs.aws.amazon.com/hands-on/latest/build-react-app-amplify-graphql/)

---

**Repository**: [https://github.com/yash-flix/notesapp](https://github.com/yash-flix/notesapp)

**Time to Complete**: ~30 minutes  
**AWS Experience Level**: Beginner  
**Cost**: Free Tier Eligible
