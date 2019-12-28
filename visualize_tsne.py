import json
from scipy import io

mat = io.loadmat('tsne.mat', struct_as_record=False)
fnames, label, mappedX, = mat['file_list'], mat['label'], mat['mappedX']

fnames = [fname[0][0] for fname in fnames]

json_dict = {}

f = open('tsne.json', 'w')

json_dict['x'] = [mappedX[ii, 0] for ii in range(mappedX.shape[0])]
json_dict['y'] = [mappedX[ii, 1] for ii in range(mappedX.shape[0])]
json_dict['fnames'] = fnames

json.dump(json_dict, f, indent=4)
f.close()
