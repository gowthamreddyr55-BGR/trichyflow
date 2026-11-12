# TRICHYFLOW — Intelligent City Traffic Coordination & Emergency Response Platform
> *"Intelligent Traffic Coordination for a Safer Trichy"*

[![Project Type](https://img.shields.io/badge/Project-College%20Major%20Project-orange.svg)]()
[![Course](https://img.shields.io/badge/Course-Advanced%20Programming%20Practice-blue.svg)]()
[![Backend](https://img.shields.io/badge/Backend-Java%20%7C%20Spring%20Boot%203-brightgreen.svg)]()
[![Frontend](https://img.shields.io/badge/Frontend-HTML5%20%7C%20Bootstrap%205%20%7C%20Leaflet.js-green.svg)]()
[![Database](https://img.shields.io/badge/Database-MySQL%20%2F%20H2%20Hybrid-yellow.svg)]()

---

## 1. Project Overview & Problem Statement

Urban traffic congestion in Tier-2 Indian cities like **Tiruchirappalli (Trichy), Tamil Nadu**, creates critical bottlenecks around key cultural, transit, and medical hubs (e.g., Chathiram Bus Stand, Central Bus Stand, Srirangam Temple corridor, TVS Tollgate convergence). Traditional traffic signal systems operate on rigid, fixed-time cycles that cannot adapt to asymmetrical vehicle rushes, causing prolonged delays, increased fuel consumption, delayed emergency response (ambulances caught in gridlock), and hazardous incident spillbacks.

**TRICHYFLOW** is a full-stack, centralized intelligent traffic operations and decision-support command centre. It integrates:
- **Dijkstra's Graph-Based Emergency Green Corridor** algorithm for zero-delay ambulance priority dispatch.
- **Adaptive Webster-Model Signal Timing Optimization** to dynamically adjust green/red phase duration based on directional queue lengths and vehicle counts.
- **Real-Time Interactive GIS Control Room Map** (Leaflet.js + OpenStreetMap) with vehicle flow animations along Trichy's arterial roads.
- **Incident & Road Block Decision Support** offering automated alternate detours.
- **E-Challan Traffic Violation Management** with searchable Tamil Nadu vehicle records.
- **Transparent Rule-Based Congestion Forecasts** factoring weather, diurnal rush hours, and temple festivals.

> [!NOTE]
> All traffic density metrics, incident reports, and simulation feeds represent **"TRICHY TRAFFIC SIMULATION"** engineered for academic evaluation and smart-city control room research.

---

## 2. Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, Leaflet.js (GIS Map), Chart.js (Analytics), Font Awesome 6 |
| **Theme Design** | Indian National Tricolour Glassmorphic Control Room (Saffron, White, India Green, Navy Blue, Rotating Ashoka Chakra) |
| **Backend** | Java 17+, Spring Boot 3.2.3, Spring Data JPA, RESTful APIs, Maven |
| **Algorithms** | Dijkstra Shortest Path (with Dynamic Congestion Weights), Webster Optimum Cycle Signal Timing, Multi-Factor Diurnal Prediction |
| **Database** | MySQL 8.0+ (Production) + Embedded In-Memory MySQL-Mode Database (Zero-Setup Evaluation) |
| **Tunneling / Remote Access** | Ngrok, Localhost |

---

## 3. System Architecture & Folder Organization

```
trichyflow/
├── backend/
│   ├── pom.xml                                      # Maven dependencies & build config
│   ├── src/main/java/com/trichyflow/
│   │   ├── TrichyFlowApplication.java               # Spring Boot Application Entrypoint
│   │   ├── config/
│   │   │   ├── WebMvcConfig.java                    # Global CORS configuration
│   │   │   └── DataInitializer.java                 # Auto-seeds 18 junctions, 22 roads, 6 hospitals, incidents
│   │   ├── controller/
│   │   │   ├── AuthController.java                  # /api/auth (Login, role verification)
│   │   │   ├── WebAuthController.java               # Spring MVC /login, /register, /logout
│   │   │   ├── JunctionController.java              # /api/junctions (Status & signal optimization)
│   │   │   ├── RoadController.java                  # /api/roads (Corridor links & blockage status)
│   │   │   ├── IncidentController.java              # /api/incidents (Accident reporting & detours)
│   │   │   ├── RoadBlockController.java             # /api/roadblocks (Closures & diversions)
│   │   │   ├── EmergencyController.java             # /api/emergency (Vehicles & Dijkstra route calculation)
│   │   │   ├── ChallanController.java               # /api/challans (Violation registry & fine issuance)
│   │   │   ├── HospitalController.java              # /api/hospitals (Emergency bed capacity)
│   │   │   ├── AdvisoryController.java              # /api/advisories (Citizen public alerts & detours)
│   │   │   ├── ConvoyController.java                # /api/convoy (VIP Green Wave progression schedule)
│   │   │   ├── EcoTrafficController.java            # /api/traffic/eco-metrics (Fuel waste & CO2 reduction)
│   │   │   ├── PredictionController.java            # /api/predictions (Congestion forecasting)
│   │   │   └── NotificationController.java          # /api/notifications (Alert stream)
│   │   ├── model/                                   # JPA Entities (User, Junction, Road, Hospital, Advisory, etc.)
│   │   ├── repository/                              # Spring Data Repositories
│   │   └── service/
│   │       ├── SignalOptimizationService.java       # Rule-driven Webster signal optimization
│   │       ├── RouteCalculationService.java          # Dijkstra graph algorithm with dynamic weights
│   │       ├── ConvoyService.java                    # VIP Green Wave synchronized signal progression
│   │       ├── EcoTrafficService.java                # Idle fuel consumption & CO2 footprint estimator
│   │       └── PredictionService.java                # Transparent rule-based prediction engine
│   └── src/main/resources/
│       ├── application.properties                   # Default embedded zero-configuration profile
│       ├── application-mysql.properties             # Native MySQL database connection profile
│       ├── templates/                               # Java Thymeleaf server-rendered pages
│       │   ├── login.html                           # Java Login portal with Indian Tricolour & Chakra
│       │   └── register.html                        # Java Officer / Operator registration page
│       └── static/                                  # Packaged frontend web assets
├── frontend/
│   ├── index.html                                   # Indian Tricolour login with rotating Ashoka Chakra
│   ├── public-portal.html                           # Public Citizen Traffic & E-Challan Portal
│   ├── register.html                                # Standalone User & Officer Registration Page
│   ├── dashboard.html                               # Central Control Room Command Center
│   ├── police-dashboard.html                        # Dedicated Traffic Police Field Portal
│   ├── css/
│   │   ├── main.css                                 # Glassmorphic dark theme with tricolour accents
│   │   ├── map.css                                  # Custom Leaflet markers & glowing corridors
│   │   └── animations.css                           # Keyframe animations (Chakra, pulses, light streams)
│   └── js/
│       ├── api.js                                   # Unified REST client with resilient in-memory fallback
│       ├── auth.js                                  # Role-based access control & session handlers
│       ├── map.js                                   # Leaflet map layer controllers & custom popups
│       ├── traffic-animation.js                     # Moving vehicle flow animations along road polylines
│       ├── green-corridor.js                        # Dijkstra green corridor runner & moving ambulance
│       ├── signal-planner.js                        # Signal optimization modal & simulation applicator
│       ├── incident-manager.js                      # Accidents & road closure reporting forms
│       ├── challan-manager.js                       # E-Challan search, filter & notice generator
│       ├── analytics-charts.js                      # Chart.js 8 analytical visualizers
│       └── notifications.js                         # Real-time toast alerts & drawer
├── database/
│   ├── schema.sql                                   # Production MySQL DDL schema with constraints
│   └── sample_data.sql                              # Pre-populated Trichy dataset (18 junctions, 22 roads, 35 challans)
├── assets/
│   └── images/                                      # Ashoka Chakra SVG, emblems, and icons
└── README.md                                        # System documentation
```

---

## 4. Key Algorithms & Mathematical Formulation

### Algorithm 1: Emergency Green Corridor (Dijkstra Shortest Path with Dynamic Weights)
Located in [`RouteCalculationService.java`](file:///C:/Users/V%20CHETAN/.gemini/antigravity/scratch/trichyflow/backend/src/main/java/com/trichyflow/service/RouteCalculationService.java).

- **Objective**: Finds the fastest navigable path from any emergency vehicle's current location to a designated trauma hospital across the Trichy road network.
- **Dynamic Cost Function**:
  $$\text{Cost}(u, v) = \text{Distance}_{km}(u, v) \times \left(1 + 1.2 \times \mathbb{I}_{\text{Congested}} + 3.0 \times \mathbb{I}_{\text{PartialBlock}}\right) + \infty \times \mathbb{I}_{\text{FullyBlocked}}$$
- **Junction Pre-emption**: Intermediate junctions along the optimal path receive automated signal override directives (`Prepare Green`, `100% Emergency Green Priority`).

### Algorithm 2: Adaptive Signal Timing Optimization (Webster Delay Minimization)
Located in [`SignalOptimizationService.java`](file:///C:/Users/V%20CHETAN/.gemini/antigravity/scratch/trichyflow/backend/src/main/java/com/trichyflow/service/SignalOptimizationService.java).

- **Objective**: Replaces static 60s cycles with adaptive splits calculated from directional approach flows.
- **Formulation**:
  $$C_{\text{optimal}} = \text{clamp}\left(45, \ 120, \ \text{round}\left((V_{NS} + V_{EW}) \times 0.45\right)\right)$$
  $$G_{NS} = \max\left(20, \ \text{round}\left(\frac{V_{NS}}{V_{NS} + V_{EW}} \times C_{\text{optimal}}\right)\right), \quad G_{EW} = C_{\text{optimal}} - G_{NS}$$
- Balances cycle length to minimize overall intersection queuing and vehicular delay.

### Algorithm 3: Multi-Factor Congestion Prediction
Located in [`PredictionService.java`](file:///C:/Users/V%20CHETAN/.gemini/antigravity/scratch/trichyflow/backend/src/main/java/com/trichyflow/service/PredictionService.java).

- Evaluates diurnal rush hours (08:30–10:30 AM, 05:30–08:00 PM), monsoon precipitation degradation (35% speed reduction), and cultural festivals (e.g., Srirangam Vaikunta Ekadasi) to categorize congestion as `LOW`, `MODERATE`, `HIGH`, or `SEVERE`.

---

## 5. Demo Credentials

| Role | Username | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Public Citizen / Motorist**| `citizen` | `citizen123` | Public portal, vehicle e-challans search & payment, incident reporting, live map |
| **Admin (Commissioner)** | `admin` | `admin123` | Full administrative control, all junctions, incidents, analytics, settings |
| **Traffic Police** | `police` | `police123` | Field view, report accidents/roadblocks, issue challans, nearby patrols |
| **Control Room Operator**| `control` | `control123`| Central GIS map, activate green corridors, optimize signals, disaster mode |

> The login page also features **1-Click Quick Demo Login Buttons** for instant evaluation without typing credentials.

---

## 6. How to Run Locally

### Option A: Immediate Zero-Setup Run (Browser / Python Server)
The frontend connects smoothly to both local and cloud environments:
1. Double-click or open `frontend/index.html` directly in any web browser:
   ```
   file:///C:/Users/V CHETAN/.gemini/antigravity/scratch/trichyflow/frontend/index.html
   ```
2. Or open via local web server:
   ```
   http://localhost:8080
   ```

### Option B: Running the Java Spring Boot Backend
1. Open PowerShell or Terminal in the `backend/` directory:
   ```powershell
   cd "C:\Users\V CHETAN\.gemini\antigravity\scratch\trichyflow\backend"
   ```
2. Compile and launch using Maven:
   ```powershell
   & "C:\Users\V CHETAN\.m2\apache-maven-3.9.9\bin\mvn.cmd" spring-boot:run
   ```
3. The Spring Boot application will start on port `8080`, initialize the database automatically, and expose REST APIs at `http://localhost:8080/api`.

### Option C: Using Production MySQL Database
1. Start your local MySQL server (port 3306).
2. Execute the schema and seed scripts in MySQL Workbench or CLI:
   ```sql
   source C:/Users/V CHETAN/.gemini/antigravity/scratch/trichyflow/database/schema.sql;
   source C:/Users/V CHETAN/.gemini/antigravity/scratch/trichyflow/database/sample_data.sql;
   ```
3. Run Spring Boot with the MySQL profile:
   ```powershell
   & "C:\Users\V CHETAN\.m2\apache-maven-3.9.9\bin\mvn.cmd" spring-boot:run -Dspring-boot.run.profiles=mysql
   ```

---

## 7. REST API Endpoints

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/login` | `GET` / `POST` | Java Spring MVC server-side login portal with Indian Tricolour theme |
| `/register` | `GET` / `POST` | Java server-side officer & operator account registration in database |
| `/logout` | `GET` | Clear Java session and return to login portal |
| `/api/auth/login` | `POST` | Authenticate user credentials and return role token |
| `/api/auth/register` | `POST` | Register new user via REST endpoint with BCrypt hashing |
| `/api/junctions` | `GET` | Retrieve all 18 Trichy monitored junctions |
| `/api/junctions/{id}/optimize-signal` | `GET` | Compute adaptive Webster signal plan for junction |
| `/api/junctions/{id}/apply-plan` | `PUT` | Apply simulated signal timings to live intersection |
| `/api/roads` | `GET` | Retrieve road network geometries and speed limits |
| `/api/incidents` | `GET` / `POST`| Fetch incident list or report a new accident with detour |
| `/api/roadblocks`| `GET` / `POST`| Fetch or enforce new road closure with diversion |
| `/api/emergency/vehicles` | `GET` | List active emergency ambulances, fire tenders, patrols |
| `/api/emergency/routes/calculate` | `POST`| Compute Dijkstra green corridor and junction pre-emption |
| `/api/challans` | `GET` / `POST`| Search violations by vehicle number or issue new e-challan |
| `/api/hospitals` | `GET` | List Trichy hospitals and trauma bed occupancy |
| `/api/advisories` | `GET` / `POST`| Broadcast & manage citizen traffic advisories & detours |
| `/api/convoy/plan` | `POST`| Compute synchronized Green Wave signal progression for VIP convoys |
| `/api/convoy/templates` | `GET`| Fetch pre-configured Trichy VIP convoy corridor templates |
| `/api/traffic/eco-metrics` | `GET`| City-wide idle fuel waste & CO2 reduction metrics |
| `/api/predictions/congestion` | `POST`| Generate rule-based multi-factor congestion forecast |
| `/api/notifications` | `GET` | Stream active control room alerts |

---

## 8. Future Scope & Limitations

### Limitations:
- Simulated vehicular volumes are model-generated for academic demonstration and do not reflect real-time physical sensor feeds from the Trichy City Corporation.
- E-Challan payment gateway integrations are mock representations for safety.

### Future Enhancements:
1. **AI / CCTV Computer Vision**: Edge video analytics for automated vehicle counting and ANPR (Automatic Number Plate Recognition).
2. **IoT Signal Controller Integration**: Direct NTCIP protocol communication with physical signal hardware.
3. **GPS Telematics**: Real-time GPS transponder feeds from 108 Emergency Service ambulances.
4. **Deep Learning Forecasting**: LSTM / Graph Convolutional Network (GCN) models for spatio-temporal congestion predictions.
