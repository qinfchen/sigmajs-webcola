;(function() {
  'use strict';

  if (typeof sigma === 'undefined') {
    throw 'sigma is not declared';
  }

  // default layout options
  var defaultOptions = {
    convergenceThreshold: 0.01,

    // link length options
    linkLength: undefined,
    symmetricDiffLinkLengths: 6,

    // positioning options
    // relative alignment constraints on the nodes with the same
    // parent node.
    alignment: undefined,
    avoidOverlaps: true,
    // layout constraints. If specified, alignment option will be
    // ignored
    constraints: undefined,
    handleDisconnected: true,

    // iterations for cola algorithm
    // unconstrained initial layout iterations
    initialUnconstrainedIterations: 0,
    // initial layout iterations with user-specified constraints
    initialUserConstraintIterations: 0,
    // initial layout iterations with all constraints including
    // non-overlap
    initialAllConstraintsIterations: 0
  };

  function ColaLayout(sigInst, options) {
    this.animationFrame = new AnimationFrame();
    this.colaNodeIndices = {};
    this.dragListener = sigma.plugins.dragNodes(
      sigInst,
      sigInst.renderers[0]);
    this.options = defaultOptions;
    this.sigInst = sigInst;

    for (var i in options) {
      if (options[i] != null) {
        this.options[i] = options[i];
      }
    }
  }

  ColaLayout.prototype.start = function() {
    var animationFrame = this.animationFrame,
      colaLinks = [],
      colaNodeIndices = {},
      container = this.sigInst.renderers[0].container,
      dragListener = this.dragListener,
      edges = this.sigInst.graph.edges(),
      nodes = this.sigInst.graph.nodes(),
      options = this.options,
      parentNodes = [],
      sigInst = this.sigInst;

    nodes.forEach(function(node, index) {
      // set up node boundaries
      node.width = node.size * 2;
      node.height = node.size * 2;
      colaNodeIndices[node.id] = index;
    });

    edges.forEach(function(edge) {
      var sourceIndex = colaNodeIndices[edge.source];
      var targetIndex = colaNodeIndices[edge.target];
      if (parentNodes[sourceIndex] == null) {
        parentNodes[sourceIndex] = [];
      }

      parentNodes[sourceIndex].push(targetIndex);
      colaLinks.push({
        source: colaNodeIndices[edge.source],
        target: colaNodeIndices[edge.target]
      });
    });

    var adaptor = cola.adaptor({
      trigger: function() {
          sigInst.refresh();
      },
      kick: function(tick) {
        function frame() {
          if (tick()) {
            return;
          }
          animationFrame.request(frame);
        }
        animationFrame.request(frame);
      },

      on: function() {
      },
      drag: function() {
        // handled in dragListener
      }
    });

    adaptor
      .size([container.offsetWidth, container.offsetHeight])
      .avoidOverlaps(options.avoidOverlaps)
      .nodes(nodes)
      .links(colaLinks)
      .handleDisconnected(options.handleDisconnected)
      .convergenceThreshold(options.convergenceThreshold);

    if (options.constraints == null && options.alignment != null &&
        (options.alignment === 'x' || options.alignment === 'y')) {
      options.constraints = [];
      parentNodes.forEach(function(parentNode) {
        var constraint = {'type': 'alignment',
          'axis': options.alignment,
          'offsets': []};
        parentNode.forEach(function(target) {
          constraint.offsets.push({node: target, offset: 0});
        });
        options.constraints.push(constraint);
      });
    }

    if (options.constraints != null) {
      adaptor.constraints(options.constraints);
    }

    if (options.linkLength) {
      adaptor.linkDistance(options.linkLength);
    }

    if (options.flowLayout != null &&
        options.flowLayout.axis != null) {
      var minSeparation = options.flowLayout.minSeparation != null ?
          options.flowLayout.minSeparation : 0;
      adaptor.flowLayout(options.flowLayout.axis, minSeparation);
    }

    adaptor.start(options.initialUnconstrainedIterations,
        options.initialUserConstraintIterations,
        options.initialAllConstraintsIterations);

    dragListener.bind('startdrag', function(e) {
      adaptor.dragstart(e.data.node);
      adaptor.resume();
    });

    dragListener.bind('drag', function(e) {
      var node = e.data.node;
      node.px = node.x;
      node.py = node.y;
      adaptor.resume();
    });

    dragListener.bind('dragend', function(e) {
      var node = e.data.node;
      node.px = node.x;
      node.py = node.y;
      adaptor.dragend(e.data.node);
    });

    this.adaptor = adaptor;
  };

  ColaLayout.prototype.stop = function() {
    if (this.adaptor) {
      this.adaptor.stop();
    }
    return this;
  };

  /**
   * Interface
   * ---------
   */

  sigma.prototype.startCola = function(config) {
    if (!this.cola) {
      this.cola = new ColaLayout(this, config);
    }

    this.cola.start();
    return this;
  };

  sigma.prototype.stopCola = function() {
    if (this.cola) {
      this.cola.stop();
    }

    return this;
  };

  sigma.prototype.killCola = function() {
    if (this.cola) {
      this.cola.stop();
      this.cola = null;
    }

    return this;
  };

  sigma.prototype.isColaRunning = function() {
    return this.cola != null;
  };
})();
