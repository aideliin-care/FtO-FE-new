import type { Patient } from "../types";

export const patients: Patient[] = [
  { id: "p1", name: "Yamada Taro", birthDate: "1985-04-12", phone: "090-1111-2222", lastVisit: "2026-09-10", primaryDoctorId: "d1" },
  { id: "p2", name: "Sato Hanako", birthDate: "1992-11-03", phone: "080-2222-3333", lastVisit: "2026-09-15", primaryDoctorId: "d2" },
  { id: "p3", name: "Park Jiwoo", birthDate: "1978-06-21", phone: "070-3333-4444", lastVisit: "2026-08-30", primaryDoctorId: "d3" },
  { id: "p4", name: "Chen Meiling", birthDate: "2001-01-09", phone: "090-4444-5555", lastVisit: null, primaryDoctorId: "d4" },
  { id: "p5", name: "Watanabe Ren", birthDate: "1960-09-01", phone: "090-5555-6666", lastVisit: "2026-09-18", primaryDoctorId: "d1" },
];
