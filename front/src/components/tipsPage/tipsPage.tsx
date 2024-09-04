/*
** EPITECH PROJECT, 2024
** B-SVR-500-LYN-5-1-survivor-killian.cottrelle
** File description:
** tipsPage
*/

import React, {useState} from 'react';
import NavBar from '../navbar/Navbar';
import "../../CSSCustomerList.css"

const options = ["Edit", "Move To Trash", "Bulk Action"];

const Tips: React.FC = () => {

  return (
    <>
      <NavBar/>
      <div className="client-size">
        <div className="text-Flex flexBack">
          <div className='interSpace'>
            <h2 className="titleClient">Tips for coaches</h2>
          </div>
        </div>
        <div className="container">
          <table className="clientList">
            <tbody>
              <tr>
                <details>
                  <summary>Help to choose the right clothes</summary>
                  <p>It is important to choose the right clothes for the first date. The first impression is very important. the first thing that a person sees is the appearance. It is important to choose the right clothes for the first date. The first impression is very important. The first thing that a person sees is the appearance.</p>
                </details>
              </tr>
              <tr>
                <details>
                  <summary>How to choose the right parfume ?</summary>
                  <p>Choosing the right perfume involves understanding your personal preferences, body chemistry, and the occasion. Start by identifying the scent families you are drawn to, such as floral, woody, or citrus. Consider how the perfume interacts with your skin, as it can smell different on each person due to body chemistry. Testing perfumes on your skin before purchasing is crucial; let the scent develop for a few hours to see how it evolves. Additionally, think about the context in which you'll wear the fragrance lighter scents are often more suitable for daytime or professional settings, while richer, more intense fragrances work well for evening or special occasions. Finally, trust your instincts; the best perfume is one that makes you feel confident and comfortable.</p>
                </details>
              </tr>
              <tr>
                <details>
                  <summary>Some dating app tips</summary>
                  <div className='tipsText'>
                    <span>Here are some tips for making the most out of dating apps:</span>
                    <li>Craft a Genuine Profile: Your profile is the first impression you make, so be authentic. Use clear, recent photos that showcase your personality, and write a bio that reflects your interests and what you're looking for.</li>
                    <li>Be Selective and Intentional: Instead of swiping right on everyone, take the time to read profiles and be selective. Engage with people who genuinely interest you, and send personalized messages that show you've paid attention to their profile.</li>
                    <li>Stay Safe: Protect your personal information. Don't share too many details too soon, and consider using the app's chat feature instead of giving out your phone number immediately. Always meet in public places for the first few dates.</li>
                    <li>Set Realistic Expectations: While dating apps can lead to meaningful relationships, it's important to manage your expectations. Not every match will result in a connection, and that's okay. Approach the experience with an open mind and enjoy the process.</li>
                    <li>Be Patient and Persistent: Building connections takes time. Don't get discouraged if things don't happen right away. Be patient, and keep engaging with the app regularly.</li>
                    <span>By following these tips, you can navigate dating apps more effectively and increase your chances of finding a meaningful connection.</span>
                  </div>
                </details>
              </tr>
              <tr>
                <details>
                  <summary>How to choose a good place for date ?</summary>
                  <p>Choosing a good place for a date depends on several factors, including your shared interests, the stage of your relationship, and the atmosphere you want to create. Ideally, select a location that allows for easy conversation, such as a cozy café, a quiet park, or a charming restaurant. If you know your date's preferences, try to incorporate them; for example, if they enjoy art, a visit to a local gallery could be a great choice. It's also important to consider the time of day and the level of formality you want to maintain. Ultimately, a good date spot should make both of you feel comfortable and allow your personalities to shine.</p>
                </details>
              </tr>
              <tr>
                <details>
                  <summary>How to choose photos for dating profile ?</summary>
                  <p>Choosing the right photos for your dating profile is crucial to making a great first impression. Start with a clear, high-quality headshot where you're smiling and looking approachable, as this will be the first image people see. Include a mix of photos that showcase your personality and interests—perhaps a full-body shot, one where you're engaged in a hobby, and another that shows you in a social setting. Make sure the images are recent and accurately represent how you look today. Avoid group photos where it's hard to tell which person you are, and steer clear of overly edited or filtered images. Lastly, authenticity is key—choose photos that reflect your true self and the life you enjoy.</p>
                </details>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tips;