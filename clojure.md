
(get "string-expression" 3)
(cycle [0 1])
(take 10 (cycle [0 1]))


(min 1 2 3 4)

(max 1 2 3 4)

;; namespace training-day :: filename training_day.clj


(use 'training-day)
(use 'clojure-repl)


(average 3 5)

(square 3)

(def quadrance (fn [x y] (+ (* x x) (* y y))))

(quadrance 2 3)
