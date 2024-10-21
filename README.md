<div align="center">
<h1>Kickstats</h1>
View information and statistics for all your <a href="https://www.kickbase.com/">Kickbase</a> leagues without the need of a pro membership.
  
---
</div>

> [!NOTE]
This is a small side project of mine to try out the <a href="https://nextjs.org/">NextJS</a> framework and explore its capabilities. The project is far away from being finished but since I maintain it in my free time, the website might seem unpolished here and there and new features might take their time before being implemented. Any issues or PRs that improve or extend the code are welcome.


# Table of Contents
- [Link to website](#link-to-website)
- [Screenshots](#screenshots)
- [ToDos](#todos)
- [License](#license)

---

## Link to website
I am currently hosting a version of this website under <a href="https://kickstats.info" target="_blank">kickstats.info</a>, although there is no guarantee that this will be the case forever.
### Login
Since I am communicating with the Kickbase API to gather the data, I need your Kickbase account credentials to communicate with the API on your behalf. The communication is done fully **client-side**, this means that your password is sent nowhere else except to the Kickbase servers directly. Since Kickbase only hands out tokens that last for a week, it is currently required that you need to log in again every 7 days.

---

## Screenshots
coming soon

---

## ToDos
This is a list of features/fixes that I plan to work on in the near future:
- Fix the missing profile picture on reload bug
- Loading States / Skeletons
- Better and more intuitive formatting / styling
- Detailled and interactive Value Graph
- Proper TypeScript Types for all API reponses
- Polling for the Live Page
- General Code cleanup

### Future Ideas
These are some more distant / bigger ideas that might be implemented at some point if I find the time:
- Search bar to find all players
- Transfer Market section (with market value trends and/or bidding even)
- Better login functionality (will be hard considering the limitations I set myself)
- Top Stats section (with links to the Player Cards)

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
