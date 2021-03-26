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

## Testing
Google pixel 4 - chrome
iPhone- safari

Desktop firefox en safari

## Enhancements
For my enhancements, I decided to choose for a selector bar with CSS 
for my usable layer and a progress bar for my pleasurable layer. Neither of these features are required to reach the goal of filling in the survey, but they make the user experience more pleasurable.

To do
- [x] Save all answers from survey to json file
- [x] fetch json file and let user continue from where they left off
- [x] add css
- [x] add slider bar - enhancement
- [x] add client side JS
- [x] Local storage progress bar - enhancement
- [x] Server validation
- [ ] Readme
- [ ] testing