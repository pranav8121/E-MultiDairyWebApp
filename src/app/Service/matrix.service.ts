import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
Cname:any
Ctype:any
Cnum:any


  Buff_fatRate: any[] = [5.5, 5.6, 5.7, 5.8, 5.9, 6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8, 8.9, 9, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10,10.1,	10.2,	10.3,	10.4,	10.5,	10.6,	10.7,	10.8,	10.9,	11,	11.1,	11.2,	11.3,	11.4,	11.5,	11.6,	11.7,	11.8,	11.9,	12,	12.1,	12.2,	12.3,	12.4,	12.5,	12.6,	12.7,	12.8,	12.9,	13,	13.1,	13.2,	13.3,	13.4,	13.5,	13.6,	13.7,	13.8,	13.9,	14,	14.1,	14.2,	14.3,	14.4,	14.5,	14.6,	14.7,	14.8,	14.9,	15];
  Buff_snfRate: any[] = [8.7, 8.8, 8.9, 9, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10];
 
  Cow_fatRate:any[]=[ 3 ,  3.1 , 3.2 , 3.3 , 3.4 , 3.5 , 3.6 , 3.7 , 3.8 , 3.9 , 4 , 4.1 , 4.2 , 4.3 , 4.4 , 4.5 , 4.6 , 4.7 , 4.8 , 4.9 , 5]
  Cow_snfRate: any[]=[8.2 , 8.3 , 8.4 , 8.5 , 8.6 , 8.7 , 8.8 , 8.9 , 9]




  Buff_matrix = [
    [37.1,	37.4,	37.7,	38,	38.1,	38.15,	38.2,	38.25, 38.3,	38.35,	38.4,	38.45,	38.5,	38.55],
    [37.4,  37.7,	38,	38.3,	38.4,	38.45,	38.5,	38.55,	38.6,	38.65,	38.7,	38.75,	38.8,	38.85],
    [37.7,	38,	38.3,	38.6,	38.7,	38.75,	38.8,	38.85,	38.9,	38.95,	39,	39.05,	39.1,	39.15],
    [38,	38.3,	38.6,	38.9,	39,	39.05,	39.1,	39.15,	39.2,	39.25,	39.3,	39.35,	39.4,	39.45],
    [38.3,	38.6,	38.9,	39.2,	39.3,	39.35,	39.4,	39.45,	39.5,	39.55,	39.6,	39.65,	39.7,	39.75],
    [38.6,	38.9,	39.2,	39.5,	39.6,	39.65,	39.7,	39.75,	39.8,	39.85,	39.9,	39.95,	40,	40.05],
    [38.9,	39.2,	39.5,	39.8,	39.9,	39.95,	40,	40.05,	40.1,	40.15,	40.2,	40.25,	40.3,	40.35],
    [39.2,	39.5,	39.8,	40.1,	40.,	40.25,	40.3,	40,	40.4,	40.45,	40.5,	40.55,	40.6,	40.65],
    [39.5,	39.8,	40.1,	40.4,	40.5,	40.55,	40.6,	40.65,	40.7,	40.75,	40.8,	40.85,	40.9,	40.95],
    [39.8,	40.1,	40.4,	40.7,	40.8,	40.85,	40.9,	40.95,	41,	41.05,	41.1,	41.15,	41.2,	41.25],
    [40.4,	40.7,	41,	41.3,	41.4,	41.45,	41.5,	41.55,	41.6,	41.65,	41.7,	41.75,	41.8,	41.85],
    [40.7,	41,	41.3,	41.6,	41.7,	41.75,	41.8,	41.85,	41.9,	41.95,	42,	42.05,	42.1,	42.15],
    [41,	41.3,	41.6,	41.9,	42,	42.05,	42.1,	42.15,	42.2,	42.25,	42.3,	42.35,	42.4,	42.45],
    [41.3,	41.6,	41.9,	42.2,	42.3,	42.35,	42.4,	42.45,	42.5,	42.55,	42.6,	42.65,	42.7,	42.75],
    [41.6,	41.9,	42.2,	42.5,	42.6,	42.65,	42.7,	42.75,	42.8,	42.85,	42.9,	42.95,	43,	43.05],
    [42.1,	42.4,	42.7,	44,	44.1,	44.15,	44.2,	44.25,	44.3,	44.35,	44.4,	44.45,	44.5,	44.55],
    [42.4,	42.7,	43,	44.3,	44.4,	44.45,	44.5,	44.55,	44.6,	44.65,	44.7,	44.75,	44.8,	44.85],
    [42.7,	43,	43.3,	44.6,	44.7,	44.75,	44.8,	44.85,	44.9,	44.95,	45,	45.05,	45.1,	45.15],
    [43,	43.3,	43.6,	44.9,	45,	45.05,	45.1,	45.15,	45.2,	45.25,	45.3,	45.35,	45.4,	45.45],
    [43.3,	43.6,	43.9,	45.2,	45.3,	45.35,	45.4,	45.45,	45.5,	45.55,	45.6,	45.65,	45.7,	45.75],
    [43.6,	43.9,	44.2,	45.5,	45.6,	45.65,	45.7,	45.75,	45.8,	45.85,	45.9,	45.95,	46,	46.05],
    [43.9,	44.2,	44.5,	45.8,	45.9,	45.95,	46,	46.05,	46.1,	46.15,	46.2,	46.25,	46.3,	46.35],
    [44.2,	44.5,	44.8,	46.1,	46.2,	46.25,	46.3,	46.35,	46.4,	46.45,	46.5,	46.55,	46.6,	46.65],
    [44.5,	44.8,	45.1,	46.4,	46.5,	46.55,	46.6,	46.65,	46.7,	46.75,	46.8,	46.85,	46.9,	46.95],
    [44.8,	45.1,	45.4,	46.7,	46.8,	46.85,	46.9,	46.95,	47,	47.05,	47.1,	47.15,	47.2,	47.25],
    [45.1,	45.4,	45.7,	47,	47.1,	47.15,	47.2,	47.25,	47.3,	47.35,	47.4,	47.45,	47.5,	47.55],
    [45.4,	45.7,	46,	47.3,	47.4,	47.45,	47.5,	47.55,	47.6,	47.65,	47.7,	47.75,	47.8,	47.85],
    [45.7,	46,	46.3,	47.6,	47.7,	47.75,	47.8,	47.85,	47.9,	47.95,	48,	48.05,	48.1,	48.15],
    [46,	46.3,	46.6,	47.9,	48,	48.05,	48.1,	48.15,	48.2,	48.25,	48.3,	48.35,	48.4,	48.45],
    [46.3,	46.6,	46.9,	48.2,	48.3,	48.35,	48.4,	48.45,	48.5,	48.55,	48.6,	48.65,	48.7,	48.75],
    [46.6,	46.9,	47.2,	48.5,	48.6,	48.65,	48.7,	48.75,	48.8,	48.85,	48.9,	48.95,	49,	49.05],
    [46.9,	47.2,	47.5,	48.8,	48.9,	48.95,	49,	49.05,	49.1,	49.15,	49.2,	49.25,	49.3,	49.35],
    [47.2,	47.5,	47.8,	49.1,	49.2,	49.25,	49.3,	49.35,	49.4,	49.45,	49.5,	49.55,	49.6,	49.65],
    [47.5,	47.8,	48.1,	49.4,	49.5,	49.55,	49.6,	49.65,	49.7,	49.75,	49.8,	49.85,	49.9,	49.95],
    [47.8,	48.1,	48.4,	49.7,	49.8,	49.85,	49.9,	49.95,	50,	50.05,	50.1,	50.15,	50.2,	50.25],
    [48.1,	48.4,	48.7,	50,	50.1,	50.15,	50.2,	50.25,	50.3,	50.35,	50.4,	50.45,	50.5,	50.55],
    [48.4,	48.7,	49,	50.3,	50.4,	50.45,	50.5,	50.55,	50.6,	50.65,	50.7,	50.75,	50.8,	50.85],
    [48.7,	49,	49.3,	50.6,	50.7,	50.75,	50.8,	50.85,	50.9,	50.95,	51,	51.05,	51.1,	51.15],
    [49,	49.3,	49.6,	50.9,	51,	51.05,	51.1,	51.15,	51.2,	51.25,	51.3,	51.35,	51.4,	51.45],
    [49.3,	49.6,	49.9,	51.2,	51.3,	51.35,	51.4,	51.45,	51.5,	51.55,	51.6,	51.65,	51.7,	51.75],
    [49.6,	49.9,	50.2,	51.5,	51.6,	51.65,	51.7,	51.75,	51.8,	51.85,	51.9,	51.95,	52,	52.05],
    [49.9,	50.2,	50.5,	51.8,	51.9,	51.95,	52,	52.05,	52.1,	52.15,	52.2,	52.25,	52.3,	52.35],
    [50.2,	50.5,	50.8,	52.1,	52.2,	52.25,	52.3,	52.35,	52.4,	52.45,	52.5,	52.55,	52.6,	52.65],
    [50.5,	50.8,	51.1,	52.4,	52.5,	52.55,	52.6,	52.65,	52.7,	52.75,	52.8,	52.85,	52.9,	52.95],
    [50.8,	51.1,	51.4,	52.7,	52.8,	52.85,	52.9,	52.95,	53,	53.05,	53.1,	53.15,	53.2,	53.25],
    [51.1,	51.4,	51.7,	53,	53.1,	53.15,	53.2,	53.25,	53.3,	53.35,	53.4,	53.45,	53.5,	53.55],

    [51.4,	51.7,	52,	53.3,	53.4,	53.45,	53.5,	53.55,	53.6,	53.65,	53.7,	53.75,	53.8,	53.85],
    [51.7,	52,	52.3,	53.6,	53.7,	53.75,	53.8,	53.85,	53.9,	53.95,	54,	54.05,	54.1,	54.15],
    [52,	52.3,	52.6,	53.9,	54,	54.05,	54.1,	54.15,	54.2,	54.25,	54.3,	54.35,	54.4,	54.45,],
    [52.3,	52.6,	52.9,	54.2,	54.3,	54.35,	54.4,	54.45,	54.5,	54.55,	54.6,	54.65,	54.7,	54.75],
    [52.6,	52.9,	53.2,	54.5,	54.6,	54.65,	54.7,	54.75,	54.8,	54.85,	54.9,	54.95,	55,	55.05],
    [52.9,	53.2,	53.5,	54.8,	54.9,	54.95,	55,	55.05,	55.1,	55.15,	55.2,	55.25,	55.3,	55.35],
    [53.2,	53.5,	53.8,	55.1,	55.2,	55.25,	55.3,	55.35,	55.4,	55.45,	55.5,	55.55,	55.6,	55.65],
    [53.5,	53.8,	54.1,	55.4,	55.5,	55.55,	55.6,	55.65,	55.7,	55.75,	55.8,	55.85,	55.9,	55.95],
    [53.8,	54.1,	54.4,	55.7,	55.8,	55.85,	55.9,	55.95,	56,	56.05,	56.1,	56.15,	56.2,	56.25],
    [54.1,	54.4,	54.7,	56,	56.1,	56.15,	56.2,	56.25,	56.3,	56.35,	56.4,	56.45,	56.5,	56.55],
    [54.4,	54.7,	55,	56.3,	56.4,	56.45,	56.5,	56.55,	56.6,	56.65,	56.7,	56.75,	56.8,	56.85],
    [54.7,	55,	55.3,	56.6,	56.7,	56.75,	56.8,	56.85,	56.9,	56.95,	57,	57.05,	57.1,	57.15],
    [55,	55.3,	55.6,	56.9,	57,	57.05,	57.1,	57.15,	57.2,	57.25,	57.3,	57.35,	57.4,	57.45],
    [55.3,	55.6,	55.9,	57.2,	57.3,	57.35,	57.4,	57.45,	57.5,	57.55,	57.6,	57.65,	57.7,	57.75],
    [55.6,	55.9,	56.2,	57.5,	57.6,	57.65,	57.7,	57.75,	57.8,	57.85,	57.9,	57.95,	58,	58.05],
    [55.9,	56.2,	56.5,	57.8,	57.9,	57.95,	58,	58.05,	58.1,	58.15,	58.2,	58.25,	58.3,	58.35],
    [56.2,	56.5,	56.8,	58.1,	58.2,	58.25,	58.3,	58.35,	58.4,	58.45,	58.5,	58.55,	58.6,	58.65],
    [56.5,	56.8,	57.1,	58.4,	58.5,	58.55,	58.6,	58.65,	58.7,	58.75,	58.8,	58.85,	58.9,	58.95],
    [56.8,	57.1,	57.4,	58.7,	58.8,	58.85,	58.9,	58.95,	59,	59.05,	59.1,	59.15,	59.2,	59.25],
    [57.1,	57.4,	57.7,	59,	59.1,	59.15,	59.2,	59.25,	59.3,	59.35,	59.4,	59.45,	59.5,	59.55],
    [57.4,	57.7,	58,	59.3,	59.4,	59.45,	59.5,	59.55,	59.6,	59.65,	59.7,	59.75,	59.8,	59.85],
    [57.7,	58,	58.3,	59.6,	59.7,	59.75,	59.8,	59.85,	59.9,	59.95,	60,	60.05,	60.1,	60.15],
    [58,	58.3,	58.6,	59.9,	60,	60.05,	60.1,	60.15,	60.2,	60.25,	60.3,	60.35,	60.4,	60.45],
    [58.3,	58.6,	58.9,	60.2,	60.3,	60.35,	60.4,	60.45,	60.5,	60.55,	60.6,	60.65,	60.7,	60.75],
    [58.6,	58.9,	59.2,	60.5,	60.6,	60.65,	60.7,	60.75,	60.8,	60.85,	60.9,	60.95,	61,	61.05],
    [58.9,	59.2,	59.5,	60.8,	60.9,	60.95,	61,	61.05,	61.1,	61.15,	61.2,	61.25,	61.3,	61.35],
    [59.2,	59.5,	59.8,	61.1,	61.2,	61.25,	61.3,	61.35,	61.4,	61.45,	61.5,	61.55,	61.6,	61.65],
    [59.5,	59.8,	60.1,	61.4,	61.5,	61.55,	61.6,	61.65,	61.7,	61.75,	61.8,	61.85,	61.9,	61.95],
    [59.8,	60.1,	60.4,	61.7,	61.8,	61.85,	61.9,	61.95,	62,	62.05,	62.1,	62.15,	62.2,	62.25],
    [60.1,	60.4,	60.7,	62,	62.1,	62.15,	62.2,	62.25,	62.3,	62.35,	62.4,	62.45,	62.5,	62.55],
    [60.4,	60.7,	61,	62.3,	62.4,	62.45,	62.5,	62.55,	62.6,	62.65,	62.7,	62.75,	62.8,	62.85],
    [60.7,	61,	61.3,	62.6,	62.7,	62.75,	62.8,	62.85,	62.9,	62.95,	63,	63.05,	63.1,	63.15],
    [61,	61.3,	61.6,	62.9,	63,	63.05,	63.1,	63.15,	63.2,	63.25,	63.3,	63.35,	63.4,	63.45],
    [61.3,	61.6,	61.9,	63.2,	63.3,	63.35,	63.4,	63.45,	63.5,	63.55,	63.6,	63.65,	63.7,	63.75],
    [61.6,	61.9,	62.2,	63.5,	63.6,	63.65,	63.7,	63.75,	63.8,	63.85,	63.9,	63.95,	64,	64.05 ],
    [61.9,	62.2,	62.5,	63.8,	63.9,	63.95,	64,	64.05,	64.1,	64.15,	64.2,	64.25,	64.3,	64.35],
    [62.2,	62.5,	62.8,	64.1,	64.2,	64.25,	64.3,	64.35,	64.4,	64.45,	64.5,	64.55,	64.6,	64.65],
    [62.5,	62.8,	63.1,	64.4,	64.5,	64.55,	64.6,	64.65,	64.7,	64.75,	64.8,	64.85,	64.9,	64.95],
    [62.8,	63.1,	63.4,	64.7,	64.8,	64.85,	64.9,	64.95,	65,	65.05,	65.1,	65.15,	65.2,	65.25],
    [63.1,	63.4,	63.7,	65,	65.1,	65.15,	65.2,	65.25,	65.3,	65.35,	65.4,	65.45,	65.5,	65.55],
    [63.4,	63.7,	64,	65.3,	65.4,	65.45,	65.5,	65.55,	65.6,	65.65,	65.7,	65.75,	65.8,	65.85],
    [63.7,	64,	64.3,	65.6,	65.7,	65.75,	65.8,	65.85,	65.9,	65.95,	66,	66.05,	66.1,	66.15],
    [64,	64.3,	64.6,	65.9,	66,	66.05,	66.1,	66.15,	66.2,	66.25,	66.3,	66.35,	66.4,	66.45],
    [64.3,	64.6,	64.9,	66.2,	66.3,	66.35,	66.4,	66.45,	66.5,	66.55,	66.6,	66.65,	66.7,	66.75],
    [64.6,	64.9,	65.2,	66.5,	66.6,	66.65,	66.7,	66.75,	66.8,	66.85,	66.9,	66.95,	67,	67.05],
    [64.9,	65.2,	65.5,	66.8,	66.9,	66.95,	67,	67.05,	67.1,	67.15,	67.2,	67.25,	67.3,	67.35],
    [65.2,	65.5,	65.8,	67.1,	67.2,	67.25,	67.3,	67.35,	67.4,	67.45,	67.5,	67.55,	67.6,	67.65],
    [65.5,	65.8,	66.1,	67.4,	67.5,	67.55,	67.6,	67.65,	67.7,	67.75,	67.8,	67.85,	67.9,	67.95],
    [65.8,	66.1,	66.4,	67.7,	67.8,	67.85,	67.9,	67.95,	68,	68.05,	68.1,	68.15,	68.2,	68.25],
    [66.1,	66.4,	66.7,	68,	68.1,	68.15,	68.2,	68.25,	68.3,	68.35,	68.4,	68.45,	68.5,	68.55]
  ];

  Cow_matrix=[
    [23.40, 23.70, 24, 24.30, 24.40, 24.45, 24.50, 24.55, 24.60],
    [23.70, 24, 24.30, 24.60, 24.70, 24.75, 24.80, 24.85, 24.90],
    [24, 24.30, 24.60, 24.90, 25, 25.05, 25.10, 25.15, 25.20],
    [24.30, 24.60, 24.90, 25.20, 25.30, 25.35, 25.40, 25.45, 25.50],
    [24.60, 24.90, 25.20, 25.50, 25.60, 25.65, 25.70, 25.75, 25.80],
    [24.90, 25.20, 25.50, 27, 27.10, 27.15, 27.20, 27.25, 27.30],
    [25.10, 25.40, 25.70, 27.30, 27.40, 27.45, 27.50, 27.55, 27.60],
    [25.30, 25.60, 25.90, 27.60, 27.70,27.75, 27.80, 27.85, 27.90],
    [25.50, 25.80, 26.10, 27.10, 28, 28.05, 28.10, 28.15, 28.20],
    [25.70, 26, 26.30, 28.20, 28.30, 28.35, 28.40, 28.45, 28.50],
    [25.90, 26.20, 26.50, 28.50, 28.60, 28.65, 28.70, 28.75, 28.80],
    [26.10, 26.40, 26.70, 28.80, 28.90, 28.95, 29, 29.05, 29.10],
    [26.30, 26.60, 26.90, 29.10, 29.20, 29.25, 29.30, 29.35, 29.40],
    [26.50, 26.80, 27.10, 29.40, 29.50, 29.55, 29.60, 29.65, 29.70],
    [26.70, 27, 27.30, 29.70, 29.80, 29.85, 29.90, 29.95, 30],
    [26.90, 27.20, 27.50, 30, 30.10, 30.15, 30.20, 30.25, 30.30],
    [27.10, 27.40, 27.70, 30.30, 30.40, 30.45, 30.50, 30.55, 30.60],
    [27.30, 27.60, 27.90, 30.60, 30.70, 30.75, 30.80, 30.85, 30.90],
    [27.50, 27.80, 28.10, 30.90, 31, 31.05, 31.10, 31.15, 31.20],
    [27.70, 28, 28.30, 31.20, 31.30, 31.35, 31.40, 31.45, 31.50],
    [27.90, 28.20, 28.50, 31.50, 31.60, 31.65, 31.70, 31.75, 31.80],
  ]
  constructor() { }
}





