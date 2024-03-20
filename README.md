<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

<h1 align='center'>FullCalendar Scheduler</h1>
<div align='center'>

![Static Badge](https://img.shields.io/badge/6.1.8-white?label=FullCalendar&labelColor=%230F6ECE) ![NPM Version](https://img.shields.io/npm/v/react?logo=react&label=React) ![Static Badge](https://img.shields.io/badge/5.14.14-white?logo=mui&logoColor=white&label=Mui&labelColor=%23007BF7) ![Static Badge](https://img.shields.io/badge/3.39.3-white?logo=reactquery&logoColor=white&label=react-query&labelColor=%23dc2626&color=black) ![Static Badge](https://img.shields.io/badge/27.5.1-white?logo=jest&logoColor=white&label=Jest&labelColor=%23C21325&color=black) ![Static Badge](https://img.shields.io/badge/7.46.0-white?logo=reacthookform&logoColor=white&label=react-hook-form&labelColor=%23EC5990) ![Static Badge](https://img.shields.io/badge/20.10.0-black?logo=nodedotjs&logoColor=white&label=Node&labelColor=%233FC22A) ![Static Badge](https://img.shields.io/badge/4.18.2-a3e635?logo=express&logoColor=white&label=express&labelColor=%23000000&color=%23a3e635) ![Static Badge](https://img.shields.io/badge/7.4.4-white?logo=mongodb&logoColor=white&label=mongodb&labelColor=%2347A248&color=%23a3e635)

</div>
<p align='center'>
<b >An easy-to-understand calendar with full management system of rooms and the events taking place in them.</b>
</p>

## Table of contents

- [Table of contents](#table-of-contents)
- [Introduction](#introduction)
- [How to install](#how-to-install)
- [Technologies and Tools](#technologies-and-tools)
  - [Client](#client)
  - [Server](#server)
- [How to use](#how-to-use)
  - [Events managment](#events-managment)
    - [Adding Event](#adding-event)
    - [Editing Event](#editing-event)
    - [Deleting Event](#deleting-event)
  - [Rooms Managment](#rooms-managment)
    - [Add room](#add-room)
    - [Add equipment to room](#add-equipment-to-room)
    - [Edit room](#edit-room)
    - [Deleting room](#deleting-room)
- [Functionality Description](#functionality-description)
  - [Calendar](#calendar)
  - [Search panel](#search-panel)
  - [Filtering panel](#filtering-panel)
  - [Room management panel](#room-management-panel)
    - [List of rooms](#list-of-rooms)
    - [Add room panel](#add-room-panel)
    - [Edit room panel](#edit-room-panel)
    - [Delete room panel](#delete-room-panel)
    - [Room equipment panel](#room-equipment-panel)
  - [Event managment panels](#event-managment-panels)
    - [Select date panel](#select-date-panel)
    - [Room selection panel](#room-selection-panel)
    - [Individual guest price and discounts panel](#individual-guest-price-and-discounts-panel)
    - [Price and total price](#price-and-total-price)
    - [Delete event](#delete-event)
- [Testing](#testing)
- [What i learned](#what-i-learned)
- [Continues integration](#continues-integration)

## Introduction

FullCalendar Scheduler was created with the needs of guesthouses and small hotels in mind. Its main goal is ease of use and clarity for older or non-technical individuals. The application is equipped with features for managing events and rooms. Additionally, it allows for guest search and room filtering.

The main components of FullCalendar Scheduler are: React, FullCalendar, Node, MongoDB, and MUI. FullCalendar was chosen as the environment to display user operations on events. MongoDB offers a straightforward database management model. MUI is used to save production time for individual functionalities.

## How to install

Clone the repository and use npm run install or yarn install in both the client and server folders.The application requires two separate environments to function: MongoDB and MongoDB Authorization. For a precise understanding of how to connect MongoDB with React, please visit https://www.mongodb.com/languages/mern-stack-tutorial. To see how to add authentication, check https://www.mongodb.com/developer/products/atlas/email-password-authentication-react/. Remember to name env names exactly like in axiosConfig.js and server.js.

## Technologies and Tools

### Client

react 18.2.0, fullcalendar 6.1.8, react-query 3.39.3, react-datetime, react-hook-form, react-tooltip, axios, mui 5.14.14, jest 5.17.0, react-color 2.19.3, dotenv: 16.3.1

### Server

node 20.10.0, cors 2.8.5, express 4.18.2, mongoose 7.4.4, nodemon 3.0.1, vercel 32.4.1, dotenv: 16.3.1

## How to use

### Events managment

#### Adding Event

1. To add an event, you need to click on a calendar field. The number on the field indicates the day when the event will start.

2. After selecting the field, an event creation panel appears. The event cannot be added if all fields are not filled out.

3. The date selection field accepts two dates: a start date and an end date. The end date cannot precede the start date. **The start date field allows selecting a date other than the one chosen by clicking on calendar.**
4. Choose a room. The room selection panel opens a list of rooms. The list does not include a feature to check if a particular room is available. Each room has basic information. The equipment list for each room is optional.

**Equipment list icons**

| Name            | Icon                                        |
| --------------- | ------------------------------------------- |
| Lodówka         | <i class="material-icons">kitchen</i>       |
| Mikrofalówka    | <i class="material-icons">microwave</i>     |
| Prysznic        | <i class="material-icons">shower</i>        |
| Wanna           | <i class="material-icons">bathtub</i>       |
| Grill           | <i class="material-icons">outdoor_grill</i> |
| Telewizor       | <i class="material-icons">tv</i>            |
| Aneks Kuchenny  | <i class="material-icons">countertops</i>   |
| Dodatkowe łóżko | <i class="material-icons">bed</i>           |
| Szafka          | <i class="material-icons">checkroom</i>     |
| Łazienka        | <i class="material-icons">bathroom</i>      |
| Plac            | <i class="material-icons">yard</i>          |
| Wifi            | <i class="material-icons">wifi</i>          |
| Telefon         | <i class="material-icons">phone</i>         |
| Obsługa         | <i class="material-icons">room_service</i>  |

5. Choose a price for guests. The price can be adjusted using buttons or entered individually. The initial default value is set in the room management panel.
6. In case you intend to accommodate fewer or more people, you can adjust it using buttons.
7. Save

#### Editing Event

To edit an event, **click on the event** you wish to edit and follow the same steps as in the instructions for adding an event.

#### Deleting Event

Deleting an event is done by clicking on event, then pressing the "USUŃ" button, and confirming your choice in the next window.

### Rooms Managment

#### Add room

1. To open the room management panel, click on "Zarządzaj pokojami" in the top left corner.
2. To start adding a room, press "Dodaj pokój" button.
3. Fill in the fields.
4. Chosse the color. Color menu is close by clicking on button again. There is also an option to set any color by copying the hex color code from the browser and pasting it into the color selection window.
5. Click "Dodaj +"

#### Add equipment to room

To add equipment, click on "Add equipment" and press the buttons corresponding to the equipment status of the room. The selected buttons will be added to the "Selected" field. Buttons in the "Selected" field can be removed by clicking on them. The buttons that appear in the add room panel can be removed in the same way.

#### Edit room

To edit a room, select the room from the list on the left and fill in the fields exactly as you would when adding a room.

#### Deleting room

Deleting an room is done by selecting the room from the list on the left, then pressing the "USUŃ" button, and confirming your choice in the next window.

## Functionality Description

The Portfolio Application consists of several sections, including:

### Calendar

The main view of the application allows for navigating between months and to the current day. In the main view navigation bar, there are additional components such as room filtering, room management, and person search.

![Imgur](https://i.imgur.com/50At5RE.png)

### Search panel

![Imgur](https://i.imgur.com/Sjppvog.jpg)
The search panel accepts letters and numbers to search for who arrived at the headquarters and when. This is intended to help in quickly identifying whether a particular client has ever visited the premises and for any potential marketing calls.

![Imgur](https://i.imgur.com/MP0GDgU.png)

### Filtering panel

The filtering panel is a dropdown list containing each room. Its purpose is to highlight a particular room in situations where there is a large number of events in the view, which may lead to reduced readability of the application.

![Imgur](https://i.imgur.com/G4NB4da.jpg)

### Room management panel

The room management panel allows for adding, editing, and deleting rooms. Before adding events, you must create at least one room.
![Imgur](https://i.imgur.com/lEnd0Ej.jpg)

#### List of rooms

The room list displays and categorizes rooms based on the maximum number of people available for each room. After adding a room for the first time with the designated number, the list automatically adds a category and then assigns the room to that category. To reduce the initial length of the list, only the 3 most popular options are displayed: 1 bed, 2 beds, 3 beds. The categories have dynamically assigned word endings for numbers.

#### Add room panel

The functionalities of this part do not require extensive translation. Each room does not have to have equipment.

#### Edit room panel

![Imgur](https://i.imgur.com/Mj5TCrI.jpg)

#### Delete room panel

![Imgur](https://i.imgur.com/f7xhQAG.jpg)

#### Room equipment panel

![Imgur](https://i.imgur.com/JEE4vBM.jpg)

### Event managment panels

The panels has several fields. Some of them are locked until a room is selected from the room selection panel.

![Imgur](https://i.imgur.com/D7zizYq.jpg)

#### Select date panel

The end date field must contain a time several hours higher than the default. Otherwise, the Fullcalendar library may behave unexpectedly, setting the event field in calendar to 1 field less than it should.

![Imgur](https://i.imgur.com/Sf2UNjB.jpg)

#### Room selection panel

![Imgur](https://i.imgur.com/jEh7B7d.png)

The panel is used to display a list of rooms. Each button has a border assigned by <code> roomColor</code> and labels corresponding to:

- the number of people
- the price per seat
- the room name
- location
- list of equipment

The list of equipment has a tooltip.

**The tooltip function is currently supported only in the desktop version.**

#### Individual guest price and discounts panel

![Imgur](https://i.imgur.com/Of5TtZ9.png)
This view is only available after selecting a room. Upon selecting a room, a number of sections responsible for determining the price are generated.
The price can be reduced by: 10%, 25%, or 50% **compared to the initial price provided by input field**.

![Imgur](https://i.imgur.com/VwlShYj.png)

#### Price and total price

![Imgur](https://i.imgur.com/BTkghdz.png)

The "Za dzień" price is calculated upon selecting the room. The final price "Do zapłaty" is calculated after selecting the number of days of stay.

#### Delete event

![Imgur](https://i.imgur.com/Ce2wqGz.png)

The removal of the event is performed by pressing the "USUŃ" button in the edit event modal.

## Testing

Aplication is covered with unit tests of core functionalities.

## What i learned

To be honest, this project has taught me how to program. Before starting this project, I had zero knowledge of handling APIs, HTTPS, and generally had a poor understanding of how to write functionalities that interact with them. To better illustrate what I've learned, I divided this report into points:

**React:**
The primary challenge in building an application that manages a large number of state changes is how to manage them so that everything works smoothly without causing headaches. Initially, I used props, but it quickly became apparent that states used in the main component could spread across many individual components and even helper functions. I thought about using Redux, but at that point, I was already dealing with several technologies that I didn't fully understand. Would it be beneficial to know Redux at this point? Absolutely! Is it worth adding extra complexity during such a significant workload? Not really...

Ultimately, I opted to use useContext. The result was that state operations turned out to be trivial, but the downside was the size of the context. The context is enormous, and I'm considering integrating it with one of the existing state management libraries to make this file more readable for other users.

Next were the functions. The application uses many methods for data manipulation, from date format changes, data filtering, slicing to create new ranges based on state values. Some of them were written by AI, but all functions required editing to work properly. Despite using artificial intelligence, none of the functions worked as intended, even with a properly executed query. The most challenging functionality was definitely the function responsible for generating guest inputs. The functionality works in relation to the number held in the Room object. The function reads this value and then generates the appropriate number of ranges based on the price per room. Additionally, each of the generated ranges had to have functions to change it depending on whether user wanted to change it by the passed percentage or by entering it manually. Moreover, each change in the range was summed up to the price value calculated from the range and the total price counted from the state value counting the number of days. Furthermore, the states responsible for the operation of this function are spread across several components.

This taught me to think comprehensively about functions and their dependencies.

**Node:**
Node was completely new to me. In the initial phase of my programming learning, I focused mainly on frontend development, so I treated backend handling as an addition. I chose MongoDB because this model allowed me to skip learning SQL databases and schema saving, as if I were still working in JS. Additionally, Node is based on JavaScript, so I didn't have to learn any backend technologies to be successful.

**CRUD:**
The first operations were made to add, edit, delete, and retrieve data from the server.

**MUI:**
As I progressed, I realized that much of the frontend functionality doesn't have to be written from scratch, and I can simply save time by using one of the libraries. I wanted to use Tailwind, but the libraries available at that time either had poor documentation, mixed up scripts in the implementation, or even worse, didn't have a specific element that would solve the problem. I chose MUI for the reasons mentioned above.

**Data Cache:**
I used the react-query library to save data locally. The library served not only for cache but also improved the dynamic UI change when displayed.

**Testing:**
The first unit tests were conducted on the client side using Jest and react-testing-library.

## Continues integration

There are plans to implement more FullCalendar functionalities such as setting the date by selecting an area. The modal responsible for adding would retrieve the time range from this operation.

I also plan to use some managing state library like Redux.
