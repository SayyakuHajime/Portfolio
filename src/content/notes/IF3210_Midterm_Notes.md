---
title: IF3210 Mobile App Development - Midterm Study Notes
course: IF3210
subject: Mobile Application Development
exam: Midterm
topics: [Mobile Platform Architecture, SDLC & Agile, React Native & Flutter, Android SDK, ConstraintLayout, Material Design, Kotlin Null Safety]
references: Android Developer Fundamentals (ADF), Android Development with Kotlin (Google), IF3210 Lecture Slides, developer.android.com
order: 2
date: "2026-06-12"
---

## 1. Arsitektur Mobile Platform

### 1.a What is Mobile Computing?

**Mobile Computing System** = computing systems that can be easily moved physically *and* whose computing can be used while being moved. Examples: Laptops, PDAs, mobile phones, wearables.

**Key Question**: How do we develop mobile apps that are extensible, flexible, and scalable?

### 1.b Distinguishing Aspects of Mobile vs Stationary Computing

- **Wireless Connectivity** - prevalent wireless network use; mobility and wireless connectivity are orthogonal (independent) concepts
- **Small Size** - constrained screen real estate, limited input methods, smaller physical form factor
- **Power Sources** - battery-powered; performance must balance power consumption
- **Mobile Nature** - used while moving; context-based, task-oriented, situational usage
- **Functionality for mobile user** - designed to meet unique needs and behaviors in various contexts

### 1.c Four Pieces of the Mobile Problem

- **Mobile User** - moving, context-switching, not focused on computing task
- **Mobile Device** - hardware with limited capabilities
- **Mobile Application** - software optimized for mobile settings
- **Mobile Network** - wireless, variable, potentially unreliable

### 1.d Wireless Communication Generations

1. **0G (1946–1980s)** - Early mobile phones in cars/trucks. Voice only, analog, expensive.
2. **1G (1980s→)** - Speed up to 2.4 kbps. Analog signal. Technologies: AMPS/DataTac.
3. **2G (1990s→)** - GSM (Finland, 1991). Speed up to 64 kbps. Digital voice + SMS + data. Tech: GSM, CDMA, TDMA.
4. **2.5G** - 2G + GPRS. Speed: 64–144 kbps. Tech: GPRS, EDGE.
5. **3G (2000s→)** - Speed: 114 kbps – 2 Mbps. Broadband, streaming, video. Tech: W-CDMA (UMTS).
6. **4G (late 2000s→)** - Speed: 100 Mbps – 1 Gbps. **MAGIC**: Mobile Multimedia, Anytime Anywhere, Global Mobility, Integrated Wireless, Customized Personal Services. Tech: LTE, WiMAX.
7. **5G (2010s→)** - Higher speed & capacity. Supports IoT/CPS, edge computing. Network slicing.

### 1.e Mobile Application Types

| Type | Description | Pros / Cons |
|------|-------------|-------------|
| Text-based App | Content provider, SMS alerts, USSD codes | Simple, low-tech |
| Mobile Website | Focus on content, simple interaction | No install needed |
| Mobile Web App | Web-based with app-like experience (HTML, CSS, JS) | + Single code base, no App Store dependency; − Limited device feature access |
| Native App | Platform-specific: iOS (Swift/ObjC), Android (Kotlin/Java) | + Faster, full device API access; − Multiple code bases |
| Games | Usually native, graphics-heavy, often bypass Java API framework | High performance needed |

### 1.f Application Context Types

- **Utility Context** - short task-based, minimal UI (Timer, Calculator, Weather)
- **Locale Context** - location-based (Maps, navigation)
- **Informative** - provides information (News, directory)
- **Productivity** - task-based, priority-ordered (Address book, shopping)
- **Immersive Fullscreen** - focuses user on app (Games)

### 1.g Mobile Platform Architecture Layers

- **Hardware** - Physical components: CPU, sensors, screen, radios
- **OS / Kernel** - Core OS. Linux kernel (Android), XNU (iOS)
- **Low-level Libraries** - Networking, file systems, multithreading, graphic rendering
- **Runtime** - Executes code. Android Runtime (ART) replaces Dalvik.
- **Native Libraries** - C/C++ libraries (OpenGL ES, WebKit, SQLite)
- **Java/Kotlin API Framework** - High-level UI toolkit, Activity Manager, Content Providers, etc.
- **System / User Apps** - Apps installed on device, including system defaults
- **Developer Tools** - IDE (Android Studio), emulator, language (Kotlin), build tools (Gradle)

### 1.h Architectural Styles for Mobile Apps

- **Thin-client wireless client-server** - logic on server, thin UI on device
- **Thick-client wireless client-server** - significant logic on device too
- **Stand-alone applications** - works fully offline, no server needed

> [!note] Virtual Machine Abstraction
> A VM (like ART on Android) abstracts hardware specificity, enabling code portability. However, performance considerations are more critical on mobile than desktop due to resource constraints.

---

## 2. Model Proses

### 2.a What is SDLC?

**Software Development Life Cycle (SDLC)** = a structured series of steps to design, develop, test, and maintain software. Goal: ensure software meets user needs and works correctly.

Benefits: quality & consistency, efficiency in time and cost, easier maintenance, better team collaboration, adaptability to changes.

### 2.b Core Software Development Activities

| Activity | Description |
|----------|-------------|
| Komunikasi | Project initiation, requirement gathering |
| Perencanaan | Estimation, scheduling, tracking |
| Pemodelan | Analysis and Design |
| Konstruksi | Programming and Testing |
| Deployment | Delivery, support, feedback |

### 2.c Process Flow Types

- **Linear Flow** - sequential; each phase completes before the next starts
- **Iterative Flow** - phases repeat in cycles, refining the product each time
- **Parallel Flow** - multiple activities run simultaneously in different streams
- **Evolutionary Flow** - product evolves through releases (v1 → v2 → vN)

### 2.d Waterfall Model

Classic linear process model. Each phase must *fully complete* before moving to the next. You cannot skip two phases back.

1. Rekayasa Kebutuhan (Requirements Engineering)
2. Analisa Kebutuhan (Requirements Analysis)
3. Perancangan Umum/Rinci (General/Detailed Design)
4. Pemrograman dan Pengujian (Programming & Testing)
5. Deployment
6. Perawatan (Maintenance)

> [!warn] Waterfall Problems
> Requirements almost always change - Waterfall can't handle this well. Users wait until the end to see the product. Blocking states occur where team members idle waiting for others. Not suited for complex systems with many stakeholders.

### 2.e Agile Methodology

Agile collects requirements **iteratively and evolutionarily**. A functionality is completed fully (requirements → code → unit tests) before starting the next.

**The Agile Manifesto (4 Values):**

| Agile Values | Over Traditional |
|---|---|
| Individuals and interactions | …over processes and tools |
| Working software | …over comprehensive documentation |
| Customer collaboration | …over contract negotiation |
| Responding to change | …over following a plan |

**Agile Variants:** Scrum (sprint-based, 2-week cycles), Kanban (flow-based, continuous), Extreme Programming (XP), Feature Driven Development (FDD), DSDM, Agile Unified Process (AUP).

### 2.f SDLC for Mobile Apps - 6 Phases

1. **Planning & Requirement Analysis** - identify user needs, business goals, technical feasibility; define key features, UI/UX expectations, monetization models
2. **UI/UX Design** - wireframing & prototyping (Figma, Adobe XD); user journey mapping; focus on mobile constraints
3. **Development** - frontend + backend in parallel; frameworks: Flutter, React Native, or native (Swift/Kotlin); modular code
4. **Testing & QA** - device and platform testing; automated & manual tests; beta via TestFlight (iOS) or Firebase App Distribution (Android)
5. **Deployment & App Store Submission** - comply with Google Play Store & Apple App Store policies; ASO; prepare for approval delays
6. **Maintenance & Update** - collect feedback via Firebase/Sentry; regular updates; ensure OS version compatibility

### 2.g Adapted Agile for Mobile - 5 Practices

- **Scrum / Kanban** - Scrum: 2-week sprints; Kanban: continuous flow-based delivery
- **Sprint Planning** - User Stories & Epics; prioritize by business value; define MVP early
- **CI/CD** - automate builds (GitHub Actions, Jenkins, Bitrise); feature toggling for phased rollouts
- **User Feedback** - analytics (Mixpanel, Firebase); A/B testing; adapt backlog based on user needs
- **Cross-functional Teams** - PM, devs, designers, QA collaborate; daily stand-ups, sprint reviews, retrospectives

**Key Terms:**
- **MVP** - Minimum Viable Product: the smallest feature set that delivers value to users
- **Sprint** - a fixed time-box (typically 2 weeks) for delivering a working increment
- **Backlog** - a prioritized list of features/tasks to be completed
- **User Story** - "As a [user], I want [feature] so that [benefit]"
- **ASO** - App Store Optimization: improving metadata for discoverability

---

## 3. Cross Platform

### 3.a The Key Challenge: Fragmentation

Each mobile platform has different interfaces, standards, programming languages, APIs, capabilities, and SDKs. Even within the same platform, devices differ in memory, screen resolution, etc.

### 3.b 3 Mobile Development Approaches

- **Native** - platform-specific languages & tools (Android: Kotlin/Java + Android Studio; iOS: Swift/ObjC + Xcode)
- **Mobile Web** - web technologies running in mobile browser (JS, HTML, CSS; tools: React, Vue, Angular)
- **Cross-Platform** - single code base targeting multiple platforms (top tools: React Native, Flutter)

**Why Use Cross-Platform?**
- Reusable code across platforms, rapid time to market, robust performance
- Close-to-native UX, broad audience reach (Android + iOS simultaneously), greater cost efficiencies

### 3.c React Native (by Meta/Facebook)

Open-source framework using **JavaScript + React** to build native apps for Android, iOS, and more. Developed internally at Facebook in 2013, public release in 2015.

**Architecture Components:**

- **JSI** (JavaScript Interface) - allows JS to hold a reference to C++ objects and vice-versa; direct method invocation without serialization costs
- **Fabric** - new rendering system; unifies render logic in C++; uses JSI to control UI directly on native side
- **TurboModules** - let React Native interact with native platform APIs not provided by RN; uses JSI to access native modules
- **Yoga** - embeddable layout system supporting a subset of CSS (mostly Flexbox); used by Fabric to position UI elements

**Render Pipeline (3 steps):**
```
Render  →  Commit  →  Mount
// View Flattening: optimization to avoid deep layout trees
```

**Core Components** (native components wrapped for JS):
`View`, `Text`, `Image`, `TextInput`, `ScrollView`, `FlatList`

### 3.d Flutter (by Google)

Open-source framework for building **natively compiled, multi-platform apps from a single codebase**. Uses Dart language. Released as open source in 2017.

**Architecture (Layered):**

- **Dart App** - composes Widgets into UI; implements business logic; owned by developer
- **Framework** - higher-level API: widgets, hit-testing, gestures, accessibility, text input
- **Engine** - rasterizes composited scenes; low-level: graphics (Skia/Impeller), text layout, Dart runtime; exposes `dart:ui` API
- **Embedder** - coordinates with OS (rendering surfaces, input, accessibility); manages event loop
- **Runner** - composes embedder pieces into an app package; generated by `flutter create`

**Rendering Process (Widget → Pixels):**
1. **Widget Tree** - everything is a Widget, stored hierarchically (stateless or stateful)
2. **Reconciliation** - linear reconciliation (not tree-diff like React) to find which widgets need updating
3. **Layout** - determines size and position of each widget
4. **Painting** - assigns colors, gradients, other visual attributes onto canvas
5. **Compositing** - combines painted widgets into final image (transparency, overlapping, layering)
6. **Rendering** - converts composite image to platform-specific GPU instructions

### 3.e React Native vs Flutter Comparison

| Aspect | React Native | Flutter |
|--------|-------------|---------|
| Language | JavaScript | Dart |
| By | Meta (Facebook) | Google |
| UI Approach | Uses native components via bridge/JSI | Custom renderer (Impeller/Skia) - draws own widgets |
| Community | Very large (JS ecosystem) | Rapidly growing |
| CI/CD | EAS (Expo) or third parties | Rich default CLI |
| Best For | Teams with strong JS/Web background | Teams with budget for Dart learning; pixel-perfect UI |

> [!insight] Framework Choice
> Choose **React Native** if your team has strong JavaScript/web background - reuse existing skills, reduces cost and development time. Choose **Flutter** if you have enough budget and resources - consistent pixel-perfect UI across platforms.

---

## 4. Intro to Android

### 4.a What is Android?

- Mobile OS based on **Linux kernel**; UI designed for touch screens
- Used on over **80% of all smartphones**; powers watches, TVs, cars, and more
- Open-source; 3+ billion monthly active devices
- 2.5+ billion monthly active Google Play users; 2M+ apps

### 4.b Android SDK

- Development tools: debugger, monitors, editors
- Libraries: maps, wearables, ML
- Virtual devices (emulators/AVDs)
- Documentation at developer.android.com

### 4.c Kotlin - The Language for Android

- **Expressive & Concise** - less boilerplate than Java; modern language features
- **Safer Code** - null safety built-in; eliminates NullPointerExceptions by default
- **Interoperable** - 100% compatible with Java; can call Java libraries from Kotlin
- **Structured Concurrency** - coroutines for async code without callback hell

### 4.d API Levels - Three Key SDK Versions

```
minSdkVersion ≤ targetSdkVersion ≤ compileSdkVersion
```

- **`minSdkVersion`** - device needs *at least* this API level to install the app
- **`targetSdkVersion`** - the API version the app was designed and tested for
- **`compileSdkVersion`** - the Android OS library version compiled *with* (usually latest)

### 4.e 4 Types of Application Components

| Component | Description | Hotel Analogy |
|-----------|-------------|---------------|
| **Activity** | A single screen with a user interface; entry point for user interaction | Registration desk |
| **Service** | Performs long-running tasks in the background (no UI) | Laundry service |
| **Broadcast Receiver** | Responds to system-wide announcements (battery low, SMS received) | Package arrival notification |
| **Content Provider** | Manages a shared set of app data (contacts, media) | City tour companies |

### 4.f App Building Blocks

- **Resources (`res/`)** - static content: layout files, images, audio, strings, colors as XML; stored separately from code for easy localization and updates
- **AndroidManifest.xml** - metadata about the app; lists all activities, services, receivers, providers; declares permissions and hardware requirements
- **Gradle build files** - build automation; `build.gradle (Module)`: dependencies, SDK versions; `build.gradle (Project)`: repositories, global config

### 4.g Views - Building Blocks of UI

*"Everything you see is a View."* Views are Android's basic UI building blocks - rectangular elements on screen.

**Display Views:** `TextView`, `ImageView`, `ScrollView`, `RecyclerView`

**Input Views:** `Button`, `EditText`, `CheckBox`, `RadioButton`, `SeekBar`, `Switch`

**View Size Options:**
- `wrap_content` - view is only as big as its content needs to be
- `match_parent` - view expands to fill its parent container
- Fixed dp value - exact size, e.g., `48dp`. Use dp not px.

### 4.h ViewGroups - Layout Containers

- **FrameLayout** - holds generally a single child View; children stacked on top of each other
- **LinearLayout** - aligns children in a single row or column; set `android:orientation` to horizontal or vertical
- **ConstraintLayout** - recommended default; positions views using constraints; avoids deep nesting

### 4.i Event Handling

```kotlin
// SAM (Single Abstract Method) - concise click listener
button.setOnClickListener { view ->
    /* handle click */
}

// Modify a View dynamically
val resultTextView: TextView = findViewById(R.id.textView)
resultTextView.text = "Goodbye!"

// Event flow: User interacts → Event fired → Check callback → Execute or ignore
```

### 4.j Accessibility Best Practices

```
Contrast Ratio: Small text ≥ 4.5:1 | Large text ≥ 3.0:1
```

- Touch target size: at least **48dp × 48dp**
- Set `contentDescription` on images and controls for screen readers
- Use **TalkBack** - Google's screen reader for Android
- Use **Switch Access** - for users who cannot use touch

---

## 5. Layouts

### 5.a Size Units in Android

- **sp** (scale-independent px) - use for **text size**; scaled by the user's font size preference
- **dp** (density-independent px) - use for **everything else** (width, height, margin, padding); consistent across screen densities
- **px** (pixels) - actual screen pixels; **not recommended** - results in different sizes on different devices

```
dp = (width in pixels × 160) ÷ screen density (dpi)
```

### 5.b Screen Density Buckets

| Qualifier | Description | DPI Estimate | Scale Factor |
|-----------|-------------|-------------|--------------|
| `ldpi` | Low density (mostly unused) | ~120 dpi | 0.75× |
| `mdpi` | Medium density (baseline) | ~160 dpi | 1× |
| `hdpi` | High density | ~240 dpi | 1.5× |
| `xhdpi` | Extra-high density | ~320 dpi | 2× |
| `xxhdpi` | Extra-extra-high density | ~480 dpi | 3× |
| `xxxhdpi` | Extra-extra-extra-high density | ~640 dpi | 4× |

### 5.c View Rendering Cycle

1. **Measure** - determine the size of each view based on constraints and content
2. **Layout** - position each view within its parent container
3. **Draw** - render the views onto the screen

### 5.d View Spacing

**Margin** - space *outside* the view's border; pushes the view away from other elements
```xml
android:layout_margin="16dp"
android:layout_marginTop="8dp"
```

**Padding** - space *inside* the view's border; pushes content away from the edge
```xml
android:padding="16dp"
android:paddingStart="8dp"
```

### 5.e ConstraintLayout

**Recommended default layout for Android.** Solves the costly issue of too many nested layouts while allowing complex behavior. Positions and sizes views using *constraints*.

> [!warn] Why avoid deep nesting?
> Deeply nested ViewGroups require more computation. Views may be measured multiple times. This causes UI slowdown and lack of responsiveness. ConstraintLayout solves this with a flat hierarchy.

**Constraint Format:**
```
app:layout_constraint<Source>_to<Target>Of="parent | @id/view"
```

**Centering a view example:**
```xml
<TextView
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintEnd_toEndOf="parent" />
```

**Widget Sizes:**
- **Fixed** - explicit size value in dp
- **Wrap content** - size is just large enough to fit content
- **Match constraints (0dp)** - expands to fill available space between constraints; use **instead of** `match_parent` in ConstraintLayout children

### 5.f Chains in ConstraintLayout

Chains let you position views in relation to each other (horizontally or vertically). Provide much of LinearLayout functionality.

| Chain Style | Description |
|-------------|-------------|
| Spread Chain | Views spread evenly across available space (default) |
| Spread Inside | First and last views at edges; space distributed between remaining views |
| Weighted Chain | Views take up space proportional to their weights |
| Packed Chain | Views packed together at center of available space |

### 5.g Guidelines

Invisible layout helpers that let you position multiple views relative to a single guide.

```xml
<Guideline
    android:orientation="vertical"
    app:layout_constraintGuide_begin="16dp" />
<!-- Specify one of these: -->
<!-- layout_constraintGuide_begin   ← from start -->
<!-- layout_constraintGuide_end     ← from end -->
<!-- layout_constraintGuide_percent ← percentage of parent (0.0–1.0) -->
```

### 5.h Groups

Control the visibility of a set of widgets as a group.

```kotlin
if (group.visibility == View.GONE) {
    group.visibility = View.VISIBLE
} else {
    group.visibility = View.GONE
}
// VISIBLE   → shown
// INVISIBLE → not shown but TAKES space
// GONE      → not shown and does NOT take space
```

### 5.i Data Binding

Bind UI components in layouts directly to data sources - replaces repetitive `findViewById()` calls.

```kotlin
// 1. Enable in build.gradle
android {
    buildFeatures { dataBinding = true }
}
```

```xml
<!-- 2. Wrap layout in <layout> tag -->
<layout>
    <data>
        <variable name="name" type="String"/>
    </data>
    <ConstraintLayout>
        <TextView android:text="@{name}" />
    </ConstraintLayout>
</layout>
```

```kotlin
// 3. Use binding in Activity
val binding: ActivityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main)
binding.name = "John"
```

> [!note] ViewBinding vs Data Binding
> **ViewBinding**: ties View to a Binding Class providing static access to views - but does NOT tie variables/data to views. **Data Binding**: does both. For reactive two-way binding, use Data Binding with LiveData or Observable objects. With Jetpack Compose, binding is not needed.

### 5.j RecyclerView

Widget for displaying lists of data. "Recycles" (reuses) item views when they scroll off-screen to make scrolling more performant.

**Key Parts:**
- **`RecyclerView.Adapter`** - supplies data and layouts; must override `getItemCount`, `onCreateViewHolder`, `onBindViewHolder`
- **`ViewHolder`** - holds references to the views for one item; reused as items scroll in/out
- **`LayoutManager`** - controls how items are arranged: `LinearLayoutManager` (list), `GridLayoutManager` (grid)

```kotlin
class MyAdapter(val data: List<Int>) : RecyclerView.Adapter<MyAdapter.MyViewHolder>() {

    class MyViewHolder(val row: View) : RecyclerView.ViewHolder(row) {
        val textView = row.findViewById<TextView>(R.id.number)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val layout = LayoutInflater.from(parent.context).inflate(R.layout.item_view, parent, false)
        return MyViewHolder(layout)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        holder.textView.text = data.get(position).toString()
    }

    override fun getItemCount(): Int = data.size
}
```

---

## 6. MD vs HIG

### 6.a Overview

**Material Design (MD)** - Google's design standard for Android. Based on the "material metaphor" - digital surfaces with real-world physics, shadows, and movement.

**Human Interface Guidelines (HIG)** - Apple's design standard for iOS. Focuses on simplicity, clarity, and deference to user content. Transparency and layering for depth.

### 6.b Core Design Principles

| Aspect | Material Design | Human Interface Guidelines |
|--------|-----------------|---------------------------|
| Philosophy | Material metaphor - digital surfaces with real-world properties (shadows, depth) | Simplicity, clarity, and deference to user content |
| Core Principle 1 | Material as Metaphor: realistic shadows and movement | Clarity: legible and visually distinct interface |
| Core Principle 2 | Bold Graphics & Intentional Colors: vibrant palettes, strong contrast | Deference: UI elements support content, don't overshadow it |
| Core Principle 3 | Meaningful Motion: animation provides visual cues for understanding | Depth through Transparency: blur and layering for hierarchy |
| Core Principle 4 | Adaptive Design: optimized for different screen sizes and orientations | Intuitive Navigation: familiar interactions, smooth transitions |

### 6.c Navigation Patterns

**Material Design:**
- **Navigation Drawer** - side menu for quick access to app sections
- **Top Tabs** - tabs at top of screen
- **Back Button** - physical or on-screen button for backward navigation

**HIG (iOS):**
- **Bottom Navigation Bar** - quick access to primary sections
- **Hierarchical Navigation** - back button in top-left corner
- **Swipe Gestures** - swipe left/right for navigation

### 6.d Visual Elements

| Element | Material Design | HIG (iOS) |
|---------|-----------------|-----------|
| Icons | Colorful, bright, detailed, expressive | Flat & monochromatic, minimalistic, simple |
| Depth | Shadows & elevation create hierarchy | Transparency & blur (no heavy shadows) |
| Animation | Explicit, smooth, meaningful movement | Natural, seamless, fluid transitions |

### 6.e Layout Approach

**Material Design:** Grid-based layout; responsive grid system with columns, gutters, margins; responsive design adapts to various screen sizes and orientations.

**HIG:** Precise alignment enhances readability; consistency - elements with similar functions have uniform appearance.

### 6.f UI Components Comparison

| Component Type | Material Design | HIG (iOS) |
|----------------|-----------------|-----------|
| Buttons | Text, Elevated, Filled, Outlined (varying emphasis) | System, Detail Disclosure, Info buttons |
| List/Card | Cards - encapsulate related info (image, text, actions) | Collection Views - similar function, different pattern |
| Text Input | Text Fields - labels, helper text, floating hints | Text Fields - built-in auto-correction, search capabilities |
| Navigation | Navigation Drawer - hidden side menu | Tab Bar - persistent bottom navigation |

### 6.g Apple Liquid Glass (2025 - new in HIG)

- **Glass-like Translucency** - semi-transparent surfaces that reveal layers beneath
- **Fluidity** - smooth, liquid-like animations and transitions
- **Light Bending** - material that appears to refract and bend light realistically

### 6.h Impact on UX

**Android (MD):** More flexibility and customization. Android offers diverse UX possibilities but at the cost of potential inconsistency across apps.

**iOS (HIG):** More consistent and structured experience. Uniform patterns across all iOS apps create predictable UX.

> [!insight] Best Practice for Developers
> Follow official guidelines for each platform. Cross-platform apps must consider both UI/UX paradigms. Don't just port an Android design to iOS or vice versa - adapt to each platform's conventions.

---

## 7. Non-Nullability (Kotlin Null Safety)

### 7.a The Problem: The Billion-Dollar Mistake

> [!warn] Tony Hoare's "Billion-Dollar Mistake" (1965)
> Tony Hoare invented the null reference in 1965 for ALGOL W. He later called it his "billion-dollar mistake" - it has led to innumerable errors, vulnerabilities, and system crashes. In Java: `NullPointerException (NPE)`.

### 7.b Kotlin's Solution: Non-Nullable by Default

In Kotlin, **all reference variables are non-nullable by default**. If you want a nullable reference, you must explicitly declare it with the `?` suffix.

```kotlin
// Non-nullable (default) - cannot be null
var name: String = "Alice"
    name = null  // COMPILE ERROR

// Nullable - must use ? suffix
var name: String? = "Alice"
    name = null  // OK
```

### 7.c Null Safety Operators

**Safe Call Operator `A?.B`**
Returns `A.B` if A is not null. Returns `null` if A is null - *never throws NPE*. Great for chaining: if any part is null, entire chain returns null.
```kotlin
val len = name?.length  // Int? (nullable)
// Chaining:
user?.address?.city?.name
```

**Elvis Operator `A ?: B`**
If A is not null, return A. If A is null, return B (default value). "Converts" nullable to non-nullable.
```kotlin
val name = nullableName ?: ""
// Elvis version:
val l: Int = b?.length ?: 0
```

**Not-Null Assertion Operator `A!!`**
Forces a nullable value to non-nullable. **If the value IS null, throws NPE at runtime.** Use only when you are 100% certain the value is not null.
```kotlin
val b = a!!  // Throws NPE if a is null
// Use sparingly - defeats null safety purpose
```

**`lateinit var`**
Marks a non-nullable property that will be initialized later (e.g., in dependency injection or `Activity.onCreate`). Throws `UninitializedPropertyAccessException` if accessed before init.
```kotlin
lateinit var result: TextView

override fun onCreate(...) {
    result = findViewById(R.id.result)
}
```

### 7.d Summary: Null Handling Decision Tree

```
Non-nullable default → A? to allow null → A?. for safe access → ?: for default → !! when certain (dangerous)
```

### 7.e Language Null Safety Comparison

| Language | Null Concept | Default Non-null? | Compile-time? | "Trust Me" Escape |
|----------|-------------|-------------------|--------------|-------------------|
| **Kotlin** | `null` / `T?` | Yes | Yes | `!!` - throws NPE if null |
| **Rust** | `None` / `Option<T>` | Yes | Yes | `.unwrap()` - panics if None |
| **Dart** | `null` / `T?` | Yes (since 2.12) | Yes | `!` suffix - throws if null |
| **TypeScript** | `null` / `T \| null` | Opt-in | Yes (with strictNullChecks) | Type assertions `as T` |
| **Java** | `@Nullable / @NonNull` | No | Tools only | Any reference is nullable by default |
| **Python** | `None` / `Optional[T]` | No | Tools only | Type hints ignored at runtime |
| **JavaScript** | `null + undefined` | No | No | Everything nullable, no enforcement |
| **C++** | `nullptr` | No | No | Raw nullptr dereference = undefined behavior |

> [!insight] Why Kotlin's Approach is Better
> By making non-null the default, the compiler warns you at the point of assignment (not at runtime crash). If you need null, you explicitly opt-in with `?`, which forces you to handle the null case. This moves NPE bugs from *runtime crashes* to *compile-time errors*.

---

## References

- Android Developer Fundamentals (ADF) - Google Developers
- IF3210 Lecture Slides - STEI ITB, Semester II 2025/2026
- developer.android.com - Official Android Documentation
- React Native Documentation - reactnative.dev
- Flutter Documentation - flutter.dev
