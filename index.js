#!/usr/bin/env node

import ora from 'ora';
import chalk from 'chalk';
import boxen from 'boxen';
import clear from 'clear';
import inquirer from 'inquirer';
import Enquirer from 'enquirer';
import open from 'open';
import terminalImage from 'terminal-image';

// List of colors to cycle through
const colors = ['#f94348', '#9261ff', '#3cc5f8', '#4acb8a'];
let colorIndex = 0;

// Function to get the next color
function getNextColor() {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return color;
}

// Create an ora spinner instance
const spinner = ora({
    text: '(⌐■_■)',
    spinner: 'dots'
});

// Function to change spinner color
function changeColor() {
    const color = getNextColor();
 // Note: ora doesn't actually use this, but we set it for reference
    spinner.text = chalk.hex(color).bold('(⌐■_■)');
}

// Start the spinner
spinner.start();
const colorInterval = setInterval(changeColor, 500); // Change color every 500ms


// Simulate some async work before stopping the spinner
setTimeout(() => {
    clearInterval(colorInterval);
    spinner.stop();
    
    const data = {
        name: chalk.hex('#f94348').bold("@nolan"),
        github: chalk.hex('#4acb8a')("https://github.com/nclan1"),
        npx: chalk.hex('#4acb8a')("no1an"),
        email: chalk.hex('#4acb8a')("ngimcnolan@gmail.com"),

        labelGitHub: chalk.hex('#9261ff').bold("git:"),
        labelEmail: chalk.hex('#9261ff').bold("email:"),
        labelCard: chalk.hex('#9261ff').bold("npm:")
    };

    const card = boxen(
        [
            `${data.name}`,
            ``,
            `${data.labelGitHub} ${data.github}`,
            `${data.labelEmail} ${data.email}`,
            `${data.labelCard} ${chalk.hex('#f94348')("npx")} ${data.npx}`,
            ``,
            `${chalk.hex('#676e8a').italic("what is hell? i maintain that it is \nthe suffering of being unable to love.")}`,
            `${chalk.hex('f94348')("~dostoevsky")}`,
        ].join("\n"),
        {
            margin: 0,
            padding: { right: 2, left: 2 },
            borderStyle: "double",
            borderColor: "#4acb8a"
        }
    );

    console.log(card);

    const options = {
        type: "list",
        name: 'actions',
        message: 'select action',
        choices: [
            {
                name: '| books',
                value: () => {
                    console.log(chalk.hex('f94348')("dune - frank herbert"))
                    console.log(chalk.hex('9261ff')("why we sleep - mathew walker"))
                    console.log(chalk.hex('4acb8a')("meditations - marcus aurelius"))
                }
            },
            {
                name: '| song',
                value: async () => {
                    console.log(chalk.hex('#b3e5ff')("on repeat ..."))
                    open("https://youtu.be/wm_hfvgakcM?si=WNzbs-e6Hm8wnIEf&t=3")
                }
            },
            {
                name: '| philosophy',
                value: async () => {
                    console.log(chalk.hex('#4acb8a')("At dawn, when you have trouble getting out of bed, tell yourself:"));
                    console.log(chalk.hex('#4acb8a')("I have to go to work — as a human being. What do I have to complain of,"));
                    console.log(chalk.hex('#4acb8a')("if I'm going to do what I was born for — the things I was brought into the world to do?"));
                    console.log(chalk.hex('#4acb8a')("Or is this what I was created for? To huddle under the blankets and stay warm?"));
                    console.log(chalk.hex('#4acb8a')(""));
                    console.log(chalk.hex('#4acb8a')("“So you were born to feel 'nice'? Instead of doing things and experiencing them?"));
                    console.log(chalk.hex('#4acb8a')("Don't you see the plants, the birds, the ants and spiders and bees going about"));
                    console.log(chalk.hex('#4acb8a')("their individual tasks, putting the world in order, as best they can?"));
                    console.log(chalk.hex('#4acb8a')("And you're not willing to do your job as a human being?"));
                    console.log(chalk.hex('#4acb8a')("Why aren't you running to do what your nature demands?"));
                    console.log(chalk.hex('#4acb8a')(""));
                    console.log(chalk.hex('#4acb8a')("You don't love yourself enough. Or you'd love your nature too, and what it demands of you."));
                    console.log(chalk.hex('#f94348').italic("~ Marcus Aurelius, Meditations"));
                }
            },
            '- exit'
        ]
    }

    function main() {
        inquirer.prompt(options).then(async answer => {
            if (answer.actions === "- exit") {
                return
            }
            else {
                console.log('-'.repeat(40))
                await answer.actions();
                console.log('-'.repeat(40))

                Enquirer.prompt({
                    type: "toggle",
                    name: "again",
                    message: "exit?",
                    default: false
                }).then(answer => {
                    if (answer.again == false) {
                        main();
                    }
                });
            }
        });
    }

    main();

}, 400); // Stop spinner after 5 seconds
