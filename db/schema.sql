CREATE DATABASE elearning_app;

CREATE TABLE courses(
    course_id SERIAL PRIMARY KEY,
    category TEXT,
    course_name TEXT,
    image_url TEXT
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT
);

CREATE TABLE course(
    category TEXT,
    course_id INTEGER,
    course_name TEXT,
    image_url TEXT,
    blurb TEXT,
    curriculum TEXT,
    skills_covered TEXT
);

CREATE TABLE user_courses(
    user_id INTEGER,
    course_id INTEGER
);

Data for courses:
INSERT INTO courses (category, course_name, image_url) VALUES ('front-end development', 'React JS', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png');
INSERT INTO courses (category, course_name, image_url) VALUES ('front-end development', 'Angular', 'https://cdn.freebiesupply.com/logos/large/2x/angular-icon-1-logo-png-transparent.png');
INSERT INTO courses (category, course_name, image_url) VALUES ('front-end development', 'HTML', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png?20170517184425');
INSERT INTO courses (category, course_name, image_url) VALUES ('cybersecurity', 'CompTIA', 'https://comptiacdn.azureedge.net/webcontent/images/default-source/mainsitetemplateimages/comptia_logo_white.png?sfvrsn=df1edab8_2');


Data for course:
INSERT INTO course (category, course_id, course_name, image_url, blurb, curriculum, skills_covered) VALUES ('front-end development', 1, 'React JS', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png', 'React Certification Training will train you to build efficient React applications by mastering the concepts of React, Redux, and React Native.', 'Intro, Components and styling, Handling navigation', 'React components, React Event Handling, React Native');
INSERT INTO course (category, course_id, course_name, blurb, curriculum, skills_covered) VALUES ('', '', '', '', '', '');