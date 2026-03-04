# Hüseyins Rezepte Website Project
This is a Project for people who wants to prepare a recipe i build this website with many features, such as a light,dark,default design button you can customize the website to your preference. In Addition you can rate each reciepe and leave your opinion about it. I build this website to help people learn how to prepare food.


## How to install ?

#### Step 1: Install Git

* Download Git from the website and install it on your System

#### Step 2: Open Your Terminal or PowerShell

* On Windows, open PowerShell
* On macOS or Linux, open the Terminal

#### Step 3: Navigate to Your Folder where you want to Start the Project

* Choose the location where you want the project to be saved

* Move into that folder using:

> cd path/to/your/choosen/folder

#### Step 4: Clone the Repository

* Copy the respository Url From GitHub

* Run this command to Clone it:

> git clone git@github.com:Hueseyin123/Rezepte.git

#### Step 5: Enter the Project Folders

* After Cloning is Finished open the Projects directory

##### but you need to open 2 Terminals so you can Start the Frontend and the Backend!

* In the First Terminal:

1. > cd Rezepte

2. > cd frontend

3. * Step 6 !

4. * Step 7 !

* In the Second Terminal:

1. > cd Rezepte

2. > cd backend

3. * Step 6 !

4. * Step 7 !

#### Step 6: Install

* Its important to install All the packages Like "package.json, ..."

* To install these packages you need to execute this command:

### `Node.js`:

> npm install

#### Step 7 Run or Start Project

You can Start the Project with the following Command:

### `npm start`

> Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
    The page will reload when you make changes.\
    You may also see any lint errors in the console.

#### Step 8 (For changes and if you want to upload them)

>   git add .
    git commit -m "Your message"
    git push

## All Usefull Commands:

### `npm test`

> Launches the test runner in the interactive watch mode.\
  See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

> Builds the app for production to the `build` folder.\
  It correctly bundles React in production mode and optimizes the build for the best performance.
    The build is minified and the filenames include the hashes.\
    Your app is ready to be deployed!
    See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

> If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build  dependency from your project.
    Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.
    You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


## Code Funktionen:

* Appheader.jsx
Responsible for the Appheader (the top section of the website) for Logout, Login, Theme switching ect..

* Profile.jsx
Profile page: allows users to update their personal data and prevents spam
by activating a 15‑second lock after too many update attempts.

* SocialCards.jsx
Not fully used, SocialCards page: loads all user profiles from the backend
and displays them as cards with avatar, name, and description.

* AuthContext.js
Storage location for the user data, accessible from anywhere in the app

* AuthProvider.js
Reads the token and loads the current user

* useFetch.js
Simple fetch hook: loads data from a URL, stores it with loading and error states,
and returns { data, loading, error }.

* useScreenSize.js
React hook that monitors the window width and returns
whether the screen is large enough for desktop view (>= 1024px).

* Category.js
Loads the recipes of a category and displays their reviews,
including average rating and pagination.

* Homepage.js
Loads all categories via GraphQL and displays them as large, clickable chips

* SignIn.jsx
Responsible for login and its related functions

* SignUp.jsx
Responsible for registration and its related functions

* App.js
Entry point of the app: sets up Apollo Client and the AuthProvider,
and renders the layout with the header and all pages via AppRoutes.

* helpers.js
Manages the login token: retrieves it from localStorage,saves it after login, and removes it on logout