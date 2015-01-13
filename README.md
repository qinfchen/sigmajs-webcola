sigmajs-webcola - v0.0.0
=================

[webcola](https://github.com/tgdwyer/WebCola) (constraint-based layout) plugin for [sigmajs](https://github.com/jacomyal/sigma.js)

## How to build it

To use it, clone the repository:

```
git clone https://github.com/qinfchen/sigmajs-webcola.git
```

To build the code:

 - Use `npm install` to install build dependencies.
 - Use `bower install` to install component dependencies.
 - Use `grunt` to build and minify the plugin

## How to Use It
Note: you need to have an instance of sigma to run this plugin
```javascript
var gSigma = new sigma({
    settings: {
        maxNodeSize: 12,
        defaultLabelSize: 8,
        labelSize: 'proportional',
        labelSizeRatio: 0.8
    }
});
```

Once all nodes and edges are added to `gSigma`, you can start the web cola simulation by calling `gSigma.startCola()`:
```javascript
gSigma.startCola({
    handleDisconnected: true,
    convergenceThreshold: 0.01,
    flow: {axis: 'y', minSeparation: 45},
    alignment: 'y'
});
```
Call `gSigma.stopCola()` to stop the web cola simulation or `gSigma.killCola()` to kill the web cola instance.

## Layout Options

### Animation Options
 * **convergenceThreshold**
   * Convergence threshold value for alpha in the simulation.
   * type: *number*
   * default value: `0.01`

### Link Length Options
 * **linkLength**
   * Specify the length for all links.
   * type: *number*
   * default value: `20`
 * **symmetricDiffLinkLengths**
   * Specify the symmetric diff link length
   * type: *boolean*
   * default value: `false`

### Positioning Options
 * **alignment**
   * Align child nodes along either x axis or y axis. It will be ignored if the **constraints** option is specified.
   * This is a lazy way to generate contraints to force all child nodes to be on th same axis.
   * type: *string*
   * default value: `undefined`
 * **avoidOverlaps**
   * Prevent overlap of nodes' boundaries
   * type: *boolean*
   * default value: `true`
 * **constraints**
   * Layout constraints
   * type: *object*
   * default value: `undefined`
   * example:
```javascript
{
  'type': 'alignment',
  'axis': 'x',
  'offsets': [{
    'node': 0,
    'offset': 0
  }]
}
```
 * **flow**
   * Use DAG flow layout
   * type: *object*
   * default value: `undefined`
   * example:
```javascript
{
  axis: 'y',
  minSeparation: 10
}
```
 * **handleDisconnected**
   * Prevent disconnected components from overlapping
   * type: *boolean*
   * default value: `true`

### Iterations for webcola algorithm
 * **initialUnconstrainedIterations**
   * Specify the number of unconstrained initial layout iterations
   * type: *number*
   * default value: `0`
 * **initialUserConstraintIterations**
   * Specify the number of intial layout iterations with user-specified constraints
   * type: *number*
   * default value: `0`
 * **initialAllConstraintsIterations**
   * Specify the number of intial layout iterations with all constraints including non-overlap
   * type: *number*
   * default value: `0`
