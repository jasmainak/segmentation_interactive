load('tsne.mat');

for i=1:length(file_list);
    fname_split = strsplit(file_list{i}, '.');
    fname = sprintf('all-mias/mdb%s.pgm', fname_split{1});
    I = imread(fname);
    if mod(str2double(fname_split(1)),2) == 0
        I(:, :) = I(:, end:-1:1);
    end
    I = remove_padding(I);
    imwrite(I, sprintf('jpeg-mias/%s', file_list{i}));
end