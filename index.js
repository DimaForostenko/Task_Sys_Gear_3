const makeP = (x, y, z) => ({x: x, y: y, z: z});
// Существует точка в пространстве такая что расстояния от неё до всех целых точек из куба со стороной 
// 100 различны. 
// Ниже подсчитывается количество различных квадратов расстояний от всех точек куба 
// до до точки (100, 5100, 510100) и сравнивается с числом точек в кубе:
const dist = (p, q) =>
    Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2);

const makeF = r => p => dist(r, p);

const seach_point=[];

let calls=0;
// В коде ниже searchR получает на вход функцию f и вызывает её один раз для точки (100, 5100, 510100). 
// Полученное расстояние возводится в квадрат и округляется - мы ищем сумму квадратов разниц координат, 
// она должна быть целой. Точности вещественных чисел JavaScript хватает чтобы восстановить квадрат расстояния 
// точно. Затем для всех точек куба вычисляются квадраты расстояний. Если очередной квадрат совпадает со 
// значением полученным на предыдущем шаге, точка найдена. Ещё раз напомню что эти квадраты различны 
// для всех точек куба.
const searchR = f => {
    const xs = 100;
    const ys = 5100;
    const zs = 510100;
    const s = makeP(xs, ys, zs);
    const d = f(s);
    const d2 = Math.round(d ** 2);
    for (let x = 0; x < 101; ++x) {
        for (let y = 0; y < 101; ++y) {
            for (let z = 0; z < 101; ++z) {
                if((xs - x) ** 2 + (ys - y) ** 2 + (zs - z) ** 2 !== d2){
                    seach_point.push(makeP(x,y,z)); 
                    calls++  ;
                }else {
                    return makeP(x, y, z);
                } 
            }
        }
    }
};

const randomX = () => Math.floor(101 * Math.random());

const randomP = () => makeP(randomX(), randomX(), randomX());

const main = () => {
    const random_point = randomP();
    const f = makeF(random_point);
    searchR(f)
    const result={random_point,seach_point,calls};
    console.log(result)
  }
  
main();
// Как отыскать точку (100, 5100, 510100)? Одномерная задача: надо выбрать число, 
// все расстояния от которого до чисел из [0, 100] различны. 
// Минимальное положительное такое число 100 - можно угадать.
//  Двумерная задача: надо выбрать ys такое что расстояния от [100, ys] 
//  до всех точек квадрата [0, 100] × [0, 100] различны. 
//  Линейный поиск отыщет минимальное ys = 5100.
//   Трёхмерную задачу решаем для точки [100, 5100, zs] и куба [0, 100] × [0, 100] × [0, 100]. 
//   Снова линейный поиск. Довольно быстрый, кстати, несмотря на большую оценку числа операций - 510 * 109.

// Возможно есть точки с меньшей нормой. Маленькая норма - хорошо. Надо различать расстояния, 
// а разрядность вещественных чисел ограничена (напомню, что поиск ведётся по корню квадратному).