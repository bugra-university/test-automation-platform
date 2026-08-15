# Vizja Testweb — Architecture & Flow Diagrams

This file contains Mermaid diagrams for the project. You can view them:

- **VS Code:** Install the "Mermaid" or "Markdown Preview Mermaid Support" extension and open this file in preview.
- **GitHub/GitLab:** Diagrams render automatically in the Markdown preview.
- **Online:** Copy a code block to [mermaid.live](https://mermaid.live) to edit or export as PNG/SVG.

---

## 1. System overview — High-level architecture

How the main parts of the system connect: User, Frontend, Backend, Test automation, and the **dummy e-commerce site** created for this project for testing (AllOverCommerce is an optional alternative).

```mermaid
flowchart TB
    subgraph User["👤 User"]
        Browser["Browser"]
    end

    subgraph Frontend["🖥️ Frontend (React)"]
        Login["Login"]
        Dashboard["Dashboard"]
        Projects["Projects / Backlog"]
        TestCases["Test Cases"]
        TestRuns["Test Runs"]
        Schedules["Schedules"]
        Reports["Reports"]
    end

    subgraph Backend["⚙️ Backend (Spring Boot API)"]
        Auth["Auth / JWT"]
        API["REST API"]
        Excel["Excel Parser"]
        Exec["Test Execution Service"]
        DB[(PostgreSQL)]
    end

    subgraph TestAutomation["🧪 Test Automation (TestNG + Selenium)"]
        TestNG["TestNG Suite"]
        Selenium["Selenium WebDriver"]
        Extent["ExtentReports"]
    end

    subgraph TestSite["🌐 Tested Site"]
        Dummy["Dummy E‑commerce\n(created for testing\n— test-site)"]
        AllOver["AllOverCommerce\n(optional alternative)"]
    end

    Browser --> Login
    Login --> Dashboard
    Dashboard --> Projects
    Dashboard --> TestCases
    Dashboard --> TestRuns
    Dashboard --> Schedules
    Dashboard --> Reports

    Frontend -->|"HTTP + JWT"| Auth
    Auth --> API
    API --> Excel
    API --> Exec
    API --> DB
    Excel --> DB
    Exec --> DB

    Exec -->|"Launch & pass suite/config"| TestNG
    TestNG --> Selenium
    Selenium -->|"Open URL, click, assert"| Dummy
    Selenium -->|"Open URL, click, assert"| AllOver
    Selenium --> Extent
    Extent -->|"Store / serve report"| Backend

    style Frontend fill:#e1f5fe
    style Backend fill:#f3e5f5
    style TestAutomation fill:#e8f5e9
    style TestSite fill:#fff3e0
```

---

## 2. Sequence — User triggers a test run

Step-by-step flow when the user starts a test run from the dashboard.

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant F as Frontend (React)
    participant B as Backend API
    participant DB as PostgreSQL
    participant T as TestNG + Selenium
    participant S as Test Site

    U->>F: Click "Run tests" / Select suite
    F->>B: POST /api/.../run (JWT)
    B->>DB: Create TestRun, TestResult records
    B->>T: Start test process (suite + config)
    T->>S: Open URL, navigate, click, assert
    S-->>T: Page / responses
    T->>T: Generate ExtentReport
    T-->>B: Execution finished (status, report path)
    B->>DB: Update TestRun, store report
    F->>B: GET /api/reports/...
    B-->>F: Report HTML or list
    F-->>U: Show results & report
```

---

## 3. Component view — What lives where

Main components and their responsibilities.

```mermaid
flowchart LR
    subgraph Frontend["Frontend"]
        direction TB
        A[Login / Auth]
        B[Dashboard]
        C[Projects & Backlog]
        D[Test Cases / Suites]
        E[Test Runs]
        F[Schedules]
        G[Reports]
    end

    subgraph Backend["Backend"]
        direction TB
        H[AuthController]
        I[ProjectsController]
        J[ExcelProcessingController]
        K[TestSuitesController]
        L[TestScheduleController]
        M[ReportsController]
        N[TestExecutionService]
        O[(PostgreSQL)]
    end

    subgraph External["Test target"]
        DummySite[Dummy E-commerce - created for testing]
        AllOver[AllOverCommerce - optional]
    end

    Frontend -->|REST + JWT| Backend
    N -->|Selenium| External
```

---

## 4. Test execution flow — From click to report

Detailed flow inside the backend when a test run is triggered.

```mermaid
flowchart TD
    A[User: Run tests] --> B[Frontend: POST run request]
    B --> C[Backend: TestExecutionService]
    C --> D[Create TestRun in DB]
    C --> E[Build TestNG XML suite]
    E --> F[Map test cases → test classes]
    F --> G[Launch JVM: TestNG + testng.xml]
    G --> H[TestNG runs US01, US02, US03]
    H --> I[Selenium opens browser]
    I --> J[Navigate to test site URL]
    J --> K[Execute test methods]
    K --> L[ExtentReport generated]
    L --> M[Backend saves report path / HTML]
    M --> N[Update TestRun status in DB]
    N --> O[Frontend fetches results & report]
    O --> P[User sees report in dashboard]
```

---

## 5. Data flow — Projects, test cases, runs

How main entities relate and where data is stored.

```mermaid
flowchart LR
    subgraph Sources["Data sources"]
        Excel[Excel upload]
        Manual[Manual create]
    end

    subgraph Backend["Backend + DB"]
        Project[Project]
        Backlog[Product Backlog]
        TC[Test Case]
        Suite[Test Suite]
        Run[Test Run]
        Report[Report]
    end

    Excel --> Project
    Excel --> Backlog
    Manual --> Project
    Backlog --> TC
    TC --> Suite
    Suite --> Run
    Run --> Report
```

---

## 6. User stories (tests) — US01, US02, US03

Which tests run and what they cover. Tests target the dummy e-commerce site created for this project.

```mermaid
flowchart LR
    subgraph Suite["TestNG Suite"]
        US01[US01: User Registration]
        US02[US02: Invalid Registration / Login]
        US03[US03: Billing Address]
    end

    subgraph Site["Test site"]
        Reg[Register page]
        Login[Sign In]
        Account[My Account / Billing]
    end

    US01 --> Reg
    US02 --> Reg
    US02 --> Login
    US03 --> Login
    US03 --> Account
```

---

## 7. Use Case Diagram — UML

Who uses the system and what they can do.

```mermaid
flowchart LR
    Tester(["👤 Tester (Actor)"])
    Scheduler(["⏱️ Scheduler (System Actor)"])

    subgraph System["Vizja Testweb — System Boundary"]
        direction TB
        UC1(["Login"])
        UC2(["Create Project"])
        UC3(["Upload Test Cases via Excel"])
        UC4(["Create Test Suite"])
        UC5(["Run Test Suite"])
        UC6(["Schedule Test Run"])
        UC7(["View Reports"])
    end

    Tester --> UC1
    Tester --> UC2
    Tester --> UC3
    Tester --> UC4
    Tester --> UC5
    Tester --> UC6
    Tester --> UC7
    Scheduler --> UC5
```

---

*Diagrams can be exported as images from [mermaid.live](https://mermaid.live) (paste the code block) or from VS Code with a Mermaid export extension.*
