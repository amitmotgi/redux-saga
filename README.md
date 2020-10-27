# :reduxsagait_card: reduxsagaMobile
* [Demo App download link](https://betafamily.com/app/22644/item/39953/5b67e9b7)
reduxsagax - demo
<div>
  <img src='https://github.com/reduxsagax/reduxsagaMobile/blob/master/Docs/appImg1.png' />
  <img src='https://github.com/reduxsagax/reduxsagaMobile/blob/master/Docs/appImg2.png' />
<div>
* iOS and Android - React Native App Development

# :boat: Apps Architecture
* [Document](https://github.com/reduxsagax/reduxsagaMobile/wiki/Apps-Architecture)

# :bridge_at_night: Integrations
<img src="https://github.com/reduxsagax/reduxsagaMobile/blob/master/Docs/Integrations.png" />

## :clapper: How to Setup
```
git clone git@github.com:reduxsagax/reduxsagaMobile.git
cd reduxsagaMobile
npm i
```

## :runner: How to Run App
1. cd to the repo
2. Run Build for either OS
  * for iOS
    * Install Xcode
    * run - Use XCode and open reduxsagaMobile Workspace file.
  * for Android
    * Install Android SDK
    * Run Genymotion
    * run `react-native run-android`

## :link: Quick Links
* [Documentation]()
* [Chat with us]()

## PR Submission process
* New feature request:
```
- [ ] - Run lint
- [ ] - Yes, all components are Pixel Perfect on iPhone-X.
- [ ] - Yes, it handles all the use-cases and flows defined in Zeplin
- [ ] - Yes, I have added common components where ever it makes sense
- [ ] - Yes, I have tested all the flows in iOS & Android
- [ ] - Yes, I have handled the error cases mentioned in Zeplin
- [ ] - Yes, I have all text, labels, titles, headers in I18N
- [ ] - Yes/No - Do I have any concerns on this PR? Any unforseen side effects? - Please mention here.
```
* Bug fixing or enhancement:
```
- [ ] - Run lint
- [ ] - Yes, all modified components are Pixel Perfect on iPhone-X.
- [ ] - Yes, it handles all the use-cases mentioned in the ticket
- [ ] - Yes, I have added common components where ever it makes sense
- [ ] - Yes, I have tested this bug on iOS & Android
- [ ] - Yes, I have all text, labels, titles, headers in I18N
- [ ] - Yes/No - Do I have any concerns on this PR? Any unforseen side effects? - Please mention here.
```

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

The `.env` file is ignored by git keeping those secrets out of your repo.

### :aerial_tramway: Get started:
1. Copy .env.example to .env
2. Add your config variables
3. Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4. Done!

### :shipit: Production Launch Checklist
1. Enable Amplitude sources https://app.segment.com/librareduxsagait/sources
2. Pick the API keys from https://analytics.amplitude.com/reduxsaga/settings/projects
3. Enable Taplytics A/B testing experimentation framework
