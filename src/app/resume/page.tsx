import React from 'react';
import type { NextPage, Metadata } from 'next';
import Image from 'next/image';
import { HeaderSection, ProfileHeader } from '@/components';

const Page: NextPage = () => (
    <main className="content">
        <ProfileHeader>
            <div className="intro-content">
                <div className="intro-section">
                    <p>
                        Hello, my name is Brian Behrens, and I am an experienced
                        software developer based in Los Angeles. With over 20
                        years of experience, I specialize in developing
                        interactive projects that engage users, drive business
                        results, and tell compelling stories.
                    </p>
                    <p>
                        <Image
                            alt="My first computer, an Apple IIGS and our family cat, Peanuts"
                            height="1440"
                            src="/images/brian-behrens-first-computer.webp"
                            width="1920"
                            className="block h-auto w-full object-fill rounded-lg"
                        />
                        <span className="block text-sm italic text-center mt-2 text-text-light">
                            The first computer I ever used was our family&apos;s
                            Apple IIGS. It was the first computer our family
                            owned.
                        </span>
                    </p>
                    <p>
                        My expertise in interaction design, web standards,
                        usability, and application architecture has enabled me
                        to create award-winning projects that meet business
                        objectives. I have worked on a diverse range of
                        projects, including e-commerce websites, social media
                        campaigns, and web-based applications.
                    </p>
                    <p>
                        As a problem solver, I enjoy collaborating with teams to
                        create innovative solutions that push the boundaries of
                        what is possible. I am passionate about technology and
                        always seek out new challenges to keep up-to-date with
                        the latest trends.
                    </p>
                </div>
                <div className="intro-section personal">
                    <p>
                        In my free time, I enjoy surfing, taking photos, and
                        spending quality time with my wife and dogs.
                    </p>
                </div>
            </div>
        </ProfileHeader>
        <HeaderSection title="Experience" component="h2" />
        <ul className="nostyle-list limit-text-width">
            <li>
                <h3>Senior Staff Software Engineer, Surfline</h3>
                <h4>Remote (Los Angeles, CA) | 2021 – Present</h4>
                <p>
                    I joined Surfline as the lead of the newly formed Web
                    Platform squad, where I was responsible for building and
                    maintaining the company&apos;s design system, shared
                    packages, services, and frontend architecture. Over time, as
                    the organization underwent changes, including the arrival of
                    a new CEO, my role evolved to focus as a Lead Engineer on
                    the Forecast platform while continuing to lead the Frontend
                    Guild. In this role, I maintain shared systems to ensure
                    scalability and consistency across platforms while also
                    planning and building new features to enhance the Forecast
                    platform&apos;s user experience.
                </p>
            </li>
            <li>
                <h3>Principal Software Engineer (IV), VideoAmp</h3>
                <h4>Santa Monica, CA | 2018 – 2021</h4>
                <p>
                    Starting at VideoAmp on the DesignOps team, we focused on
                    building our design system. This was built using TypeScript,
                    React, Jest, Cypress, Percy, Codecov, D3 and more. I then
                    transitioned to a principal role, working as a full-stack
                    engineer delivering features and shared code in both our
                    front and backend services using Node.js, TypeScript, React,
                    hapi, Postgres, Snowflake and various AWS services like SQS
                    and SNS. I helped lead guild meetings and mentor other
                    engineers.
                </p>
            </li>
            <li>
                <h3>Software Engineer – Front End, REI</h3>
                <h4>Kent, WA | 2017 – 2018</h4>
                <p>
                    Lead front end software engineer for the Classes/Events and
                    Adventures team. Work in a continuous integrated environment
                    with Docker, Java, Jenkins and more. Spend most of my time
                    updating our front end systems to be written in ES6 linting
                    standards with Vue.js components. Use build tools like
                    webpack and dependency management on the front end is done
                    via our private NPM repository. Unit test our shared modules
                    with Mocha and Chai.
                </p>
            </li>
            <li>
                <h3>Senior Interactive Developer, POP</h3>
                <h4>Seattle, WA | 2015 – 2017</h4>
                <p>
                    Second time working at POP. Previously wrote a large amount
                    of ActionScript 3, building applications and animations for
                    various clients. This time I focused heavily on JavaScript.
                    Used Node.js on almost every project integrating Grunt, Gulp
                    or webpack for build tools. Used frameworks/libraries like
                    React, Angular, GreenSock, jQuery, ScrollMagic and many
                    others. Created animations in both CSS and JavaScript. Led
                    various server integrations, API and database development,
                    Docker configuration and other backend duties. Developed
                    within Node.js, Apache, .NET and AWS environments.
                </p>
            </li>
            <li>
                <h3>Senior Web Developer, Mervin Manufacturing</h3>
                <h4>Seattle, WA | 2012 – 2015</h4>
                <p>
                    Led a team in development efforts and made key decisions in
                    e-commerce infrastructure, hosting architecture and build
                    systems. Developed new applications for users to find and
                    customize products. Developed responsive WordPress templates
                    for all brand sites. Researched new technologies like
                    Angular and implemented them in production builds. Planned
                    marketing and social initiatives. Implemented new management
                    communication and analytic tools for team efficiencies. Set
                    up source control infrastructure. Evaluated analytics and
                    made informed online-business decisions.
                </p>
            </li>
            <li>
                <h3>Senior Interface Developer, Blast Radius</h3>
                <h4>Seattle, WA | 2011 – 2012</h4>
                <p>
                    Managed a team of developers executing marketing initiatives
                    for Starbucks. Brainstormed and planned technical execution
                    on Frappuccino, Pumpkin Spice Latte and Starbucks Holiday.
                    Planned timelines and feature specifications for technical
                    execution. Utilized JIRA for iteration planning. Programmed
                    MVC based Flash experiences for Starbucks Holiday and
                    Frappuccino using ActionScript 3 and PureMVC.
                </p>
            </li>
            <li>
                <h3>Senior Interactive Developer, POP</h3>
                <h4>Seattle, WA | 2008 – 2011</h4>
                <p>
                    Built Flash based experiences for corporate clients such as
                    Target, Nintendo, Amazon, Xbox and more. Led development
                    planning efforts and execution.
                </p>
            </li>
            <li>
                <h3>Multimedia Developer, Marx Creative</h3>
                <h4>Milwaukee, WI | 2006 – 2008</h4>
                <p>
                    = Web development (HTML, CSS, Javascript, Ajax, Flash, XML,
                    PHP and MySQL), DVD production, In-store Media Creation
                </p>
            </li>
            <li>
                <h3>Freelance Web Development</h3>
                <h4>2006 – Present</h4>
                <p>
                    Web-design and Programming (HTML, CSS, Javascript, Flash,
                    XML, PHP and MySQL), Custom CMS Application Development
                </p>
            </li>
            <li>
                <h3>Multimedia Developer, WIN Media Inc.</h3>
                <h4>Burlington, WI | 2003 – 2006</h4>
                <p>
                    Project Management, CD-ROM Development, Web Development
                    (HTML, CSS, Javascript, Flash, PHP and MySQL), DVD
                    Production, Live Event Video Production, Commercial
                    Productions
                </p>
            </li>
            <li>
                <h3>Production Assistant, Milwaukee Public Television</h3>
                <h4>Milwaukee, WI | 2002 – 2003</h4>
                <p>
                    Floor Director, Camera, Make-up, TelePrompTer, Switcher,
                    Lighting, Audio
                </p>
            </li>
            <li>
                <h3>
                    Co-Producer, Milwaukee Bucks &quot;Bucks Buddy&quot;
                    Half-time Segment
                </h3>
                <h4>Milwaukee, WI | 2003</h4>
                <p>
                    I Produced, Shot, and Edited a 30 second half-time segment
                    for the &quot;Bucks Buddy&quot; program with partner, Brad
                    Manderscheid. The segment aired on the WB during a Bucks
                    half-time show.
                </p>
            </li>
            <li>
                <h3>
                    Executive Producer, MPTV&apos;s &quot;Letters to Santa&quot;
                </h3>
                <h4>Milwaukee, WI | 2002</h4>
                <p>
                    I oversaw all aspects of production in the 7 Part
                    Children&apos;s Series aired on Milwaukee Public Television.
                </p>
            </li>
        </ul>
        <HeaderSection title="Awards" component="h2" />
        <ul className="nostyle-list limit-text-width">
            <li>
                <h3>Target – Best of the Bullseye: Collaboration</h3>
                <h4>Seattle, WA | 2008</h4>
                <p>
                    The team at POP on the Target account was awarded a Best of
                    the Bullseye award by Target Corporate for collaboration.
                </p>
            </li>
            <li>
                <h3>Freddie Award</h3>
                <h4>Milwaukee, WI | 2007</h4>
                <p>
                    International Health and Medical Media Awards for Best Web
                    Site
                    <br />
                    Working at Marx Creative, I helped produce and maintain
                    chefmd.com. I set up the databases, created/implemented
                    designs, and maintained the site since I started at Marx
                    Creative in 2006.
                </p>
            </li>
            <li>
                <h3>Best Director Award</h3>
                <h4>Milwaukee, WI | 2003</h4>
                <p>
                    Milwaukee Public Television Student Operations
                    <br />I was awarded best director for a half hour long
                    feature titled &quot;Let&apos;s Be Frank&quot;. I was the
                    director, producer, cinematographer, and editor for this
                    feature.
                </p>
            </li>
        </ul>
        <HeaderSection title="Education" component="h2" />
        <ul className="nostyle-list limit-text-width">
            <li>
                <h3>Milwaukee Area Technical College</h3>
                <h4>Milwaukee, WI | 2001 – 2003</h4>
                <p>Associates Degree in Television &amp; Video Production</p>
            </li>
            <li>
                <h3>Milwaukee Area Technical College</h3>
                <h4>Milwaukee, WI | 2003 – 2005</h4>
                <p>Associates Degree in Visual Communications</p>
            </li>
        </ul>
        <HeaderSection title="Skills" component="h2" />
        <div className="limit-text-width">
            <p>
                HTML, CSS, JavaScript, TypeScript, Node.js, React, Next.js,
                webpack, GitHub Actions, Jenkins, Preprocessors, Babel, Vue.js,
                Angular, MySQL, NoSQL, PHP, Source Control (Git &amp; SVN),
                WordPress, JSON, XML, Social APIs, NPM, JS Libraries (Lodash,
                MUI, GreenSock, Jest, React Testing Library, Cypress), Python,
                Go, AWS, Agile Methodology, Adobe Creative Cloud, Project
                Estimation/Planning, Managing Development Teams, Video
                Production and Photography
            </p>
        </div>
    </main>
);

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Resume',
        description:
            'The personal resume of Brian Behrens, Staff Software Engineer at Surfline.',
        openGraph: {
            images: ['/images/share-computer.jpg'],
        },
    };
};

export default Page;
