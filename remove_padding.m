function I = remove_padding(J)

I = fliplr(J);
th = 5000; % threshold

sumI = sum(I);
diffI = sumI(2:end) - sumI(1:end-1);

padding = find(diffI > th, 1, 'first');
I(:, 1:end-padding) = I(:, padding+1:end);

I = fliplr(I);

end