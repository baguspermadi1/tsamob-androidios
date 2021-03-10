# SERA - TSA Mobile Application

## Continous Integration and Continous Deployment Status

| CI/CD Process              | Branch | Status Process      |
| -------------------------- | ------ | ------------------- |
| Azure Pipeline Production  | main   | [Build Status Link] |
| Azure Pipeline QA          | qa     | [Build Status Link] |
| Azure Pipeline Development | master | [Build Status Link] |

---

### Current Version Production : 1.0.0

**iOS Prod Download** : https://install.appcenter.ms/orgs/

**Android Prod Download** : https://install.appcenter.ms/orgs/

---

### Current Version QA : 1.0.0

**iOS QA Download** : https://install.appcenter.ms/orgs/

**Android QA Download** : https://install.appcenter.ms/orgs/

---

### Current Version Development : 1.0.0

**iOS Dev Download** : https://install.appcenter.ms/orgs/

**Android Dev Download** : https://install.appcenter.ms/orgs/

---

## How to Install Project Library Dependency

_After clone the project you need to install dependecy with NPM Install in terminal_

```
npm install
```

### How to Run in Android Platform in Local

If using Android X, run jetifier first with terminal in root folder by using command :

```
npx jetify
```

After jetifier run, you can run in your android device / android simulator with terminal in root folder by using command :

```
npm run android
```

### How to Run in iOS Platform in Local

Install dependency in ios by using pods with terminal in root folder by using command :

```
cd ios && pod install && cd ..
```

After pods install, you can run in your iPhone simulator with terminal in root folder by using command :

```
npm run ios
```

---
## Procedure Before Build APK / IPA

Change environment in app.json from root repository to **_production_** / **_qa_** / **_development_** with environment do you want to build and use.

To increase the App Version There are 3 steps to do :

- **React Native**

  - Native Path : /app.json in Root Path Repository
  - Change **_appVersion_**

- **Android**

  - Native Path : /android/app/build.gradle
  - Change **_versionName_**
  - Change **_versionCode_** with existing versionCode + 1

- **iOS**
  - Native Path : /ios/TSA_MOB.xcodeproj/project.pbxproj
  - Change **_MARKETING_VERSION_**
  - Change **_CURRENT_PROJECT_VERSION_** with existing CURRENT_PROJECT_VERSION + 1

#### Detail environment :

- production : No Redux Logger, use Production API
- qa : No Redux Logger, use QA API
- development : Show Redux Logger in Console, use Development API
