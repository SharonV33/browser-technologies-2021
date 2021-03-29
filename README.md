## Minor web development and design survey
[live link](https://minorwebdev.herokuapp.com/)
<img src="https://i.ibb.co/kmHbs9g/image.png">

## Tabe of content
* [features](#features)
* [the Assignment](#the-assignment)
* [The functional layer](#the-functional-layer)
* [The usable layer](#the-usable-layer)
* [The pleasurable layer](#the-pleasurable-layer)
* [Testing]()
* [installing](#installing)

## features
* Pure CSS sliders
* A progress bar using LocalStorage
* Saving data to JSON
* Form validation with express-validation
* Pre filling already given answers


## the assignment
For the class Browser technologies, I was asked to make a progressively enhanced 
survey for the minor web development and design. Progressive enhancement is an 
approach to ensure that the basic functionality is accessible to everyone but 
where the experience improves layer by layer. These layers are called functional, 
usable and pleasurable. The user should be able to complete the user goal in each of these 
layers. For my assignment, the user goal is being able to fill in a survey about the minor 
web development and design. The user should also be able to continue from where they left off if they
were not able to complete the survey.

## the functional layer
My functional layer exists of plain HTML and a server. These are features which are required
to be supported by a browser, if this would not be the case then no websites would be viewable. 
In my HTML, I use forms to allow the user to submit answers to questions about the minor. With my server, 
I store these in a JSON file with their student ID as identifier. This means that, when a user 
that has already started the survey enters their student ID, my server will be able to get their 
JSON file with answers and continue to put answers in here. Sure, the website does not look very 
nice but the goal of filling in the survey and continuing where you left off are achievable. 

## the usable layer
The usable layer makes the website easier and more pleasant to use, but does not add or remove 
any key features from the functional layer. This means that the usable layer can be used to 
enhance the user experience. For my survey, I decided to use the usable layer for two main things. 
Firstly, to make the website responsive. This greatly improves the user experience of mobile users. 
While the survey would be usable both with and without the responsiveness, it becomes easier to 
use. Secondly, I used the usable layer to create a selector bar where the user can grade the 
subjects on the material, explanations and insight gained. In the functional layer, users can 
grade these parts of the class with radio buttons. To make this more pleasant and visually 
stimulating, I've made the radio buttons into a bar with a hidden gradient going from red to 
yellow to green. While enhancing the overall experience, this bar also gives back visual 
feedback on the answer the user has selected.

## the pleasurable layer
The final layer of enhancement is called the pleasurable layer. This layer, like the 
usable layer, makes the website or app easier to use without adding or removing key features. 
The pleasurable layer is most often associated with adding JavaScript. The main issue with 
this layer being JavaScript is that not all users have all the latest features of JavaScript 
available on their device. This could either be due to an older device or an old browser. 
One of these JavaScript features that might be unavailable is LocalStorage. This allows a 
website to store data onto the user's computer. Some browsers or devices don't allow this or 
a user could turn this feature off manually. I decided to add a progress bar using LocalStorage 
for users who have this feature enabled and available. The progress bar lets users see how far 
in the survey they are at any point. This could also motivate the user to finish the survey if 
they see that they are almost done.



## Testing
Google pixel 4 - chrome
iPhone- safari

Desktop firefox en safari

## installing
Clone the repository
```
git clone https://github.com/SharonV33/browser-technologies-2021.git
```
Navigate to the directory
```
cd YOUR_SOURCE_DIRECTORY/browser-technologies-2021
```
Install dependencies
```
npm install 
```
Run the project for development, this will start the server on localhost:3000 using nodemon
```
npm run dev
```
Run the project for deplopment
```
npm run start
```

MIT licence