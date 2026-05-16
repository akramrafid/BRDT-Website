# BRDT Charity System: Data Flow Diagrams

As a Senior Database Engineer, I've designed the Data Flow Diagrams (DFD) for the BRDT Charity Website. These diagrams map out how data moves between the system, external entities (like donors and payment gateways), and our data stores. 

I've structured this into two levels: **Level 0 (Context Diagram)** which gives a high-level bird's-eye view, and **Level 1** which breaks down the core functional processes.

---

## Level 0: Context Diagram
This diagram shows the BRDT Charity System as a single high-level process interacting with external entities.

```mermaid
flowchart TD
    %% External Entities
    Donor([Donor / Visitor]):::entity
    Admin([Website Admin]):::entity
    PaymentGateway([Payment Gateway<br/>Stripe/PayPal]):::entity

    %% Main System
    System(((BRDT Charity<br/>System))):::process

    %% Data Flows
    Donor -- "Registration, Login Info, OTP Request" --> System
    System -- "Auth Status, OTP Email" --> Donor
    
    Donor -- "Donation Details, Appeal Selection" --> System
    System -- "Donation Invoice, Thank You" --> Donor
    
    Donor -- "Contact Inquiry, Newsletter Email" --> System
    System -- "Content (Projects, Appeals), Confirmations" --> Donor
    
    System -- "Payment Transaction Data" --> PaymentGateway
    PaymentGateway -- "Payment Status / Transaction ID" --> System
    
    System -- "Admin Notifications, Invoices" --> Admin
    Admin -- "Content Updates (Future)" --> System

    %% Styling
    classDef entity fill:#1d3b82,stroke:#1d3b82,color:#ffffff,font-weight:bold,rx:10,ry:10;
    classDef process fill:#8c1d54,stroke:#8c1d54,color:#ffffff,font-weight:bold,shape:circle;
```

---

## Level 1: Core Processes DFD
This diagram breaks down the main system into four core sub-processes, detailing how they interact with specific database tables based on your requirement listing.

```mermaid
flowchart TD
    %% External Entities
    Donor([Donor / Visitor]):::entity
    Admin([Website Admin]):::entity
    PaymentGW([Payment Gateway]):::entity

    %% Processes
    P1(((1.0<br/>Manage<br/>Authentication))):::process
    P2(((2.0<br/>Process<br/>Donations))):::process
    P3(((3.0<br/>Serve Content<br/>& Appeals))):::process
    P4(((4.0<br/>Manage<br/>Communications))):::process

    %% Data Stores
    D1[(D1: Users DB)]:::store
    D2[(D2: Donations DB)]:::store
    D3[(D3: Content DB)]:::store
    D4[(D4: Communications DB)]:::store

    %% ----- Authentication Flows -----
    Donor -- "Credentials, OTP Request" --> P1
    P1 -- "Create/Verify User" --> D1
    D1 -- "Auth Token, User Data" --> P1
    P1 -- "OTP Email, Auth Status" --> Donor

    %% ----- Content Flows -----
    Donor -- "Page/Project Request" --> P3
    D3 -- "Project/Appeal Data" --> P3
    P3 -- "Rendered Pages" --> Donor

    %% ----- Donation Flows -----
    Donor -- "Amount, Appeal Type" --> P2
    P2 -- "Process Payment" --> PaymentGW
    PaymentGW -- "Payment Success/Fail" --> P2
    P2 -- "Store Record" --> D2
    D1 -. "Fetch Donor Info" .-> P2
    P2 -- "Invoice Email" --> Donor
    P2 -- "Notification/Copy" --> Admin

    %% ----- Communication Flows -----
    Donor -- "Newsletter Email, Contact Form" --> P4
    P4 -- "Store Inquiry / Email" --> D4
    P4 -- "Confirmation / Auto-reply" --> Donor

    %% Styling
    classDef entity fill:#1d3b82,stroke:#1d3b82,color:#ffffff,font-weight:bold,rx:10,ry:10;
    classDef process fill:#8c1d54,stroke:#8c1d54,color:#ffffff,font-weight:bold;
    classDef store fill:#29aee4,stroke:#1d3b82,color:#1e293b,font-weight:bold,shape:cylinder;
```

### Key Highlights from a Database & UI Perspective:
1. **Separation of Concerns**: The processes strictly handle specific domains (Auth, Donations, Content, Communications), which translates well to micro-services or modular MVC backend architectures in the future.
2. **Dual-Email System Handled**: Process `2.0` clearly forks the output flow for donations, sending the invoice to the Donor and the notification directly to the Admin.
3. **Centralized Subscriptions**: Process `4.0` funnels all newsletter emails directly into `D4: Communications DB`, ensuring no leads are lost across different pages.
4. **OTP Flow**: Process `1.0` accounts for the round-trip of sending the OTP email to the donor and verifying it against `D1`.
